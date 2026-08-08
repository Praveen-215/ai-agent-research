import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

SCRIPT_DIR = str(Path(__file__).resolve().parent)
if SCRIPT_DIR in sys.path:
    sys.path.remove(SCRIPT_DIR)

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

from analysis.analyzer import ExperimentAnalyzer


class ExperimentVisualizer:

    def __init__(self, csv_path="results/experiment_summary.csv"):
        self.repo_root = Path(__file__).resolve().parents[1]
        self.csv_path = Path(csv_path)
        if not self.csv_path.is_absolute():
            self.csv_path = self.repo_root / self.csv_path

        self.output_folder = self.repo_root / "results" / "plots"
        self.subfolders = {
            "distributions": "distributions",
            "performance": "performance",
            "deception": "deception",
            "quality": "quality",
            "stress": "stress",
            "correlation": "correlation",
        }
        self._ensure_output_folders()
        self._load_data()
        self._configure_style()

    # -----------------------------------------------------

    def _configure_style(self):
        sns.set_theme(style="whitegrid")
        plt.rcParams.update(
            {
                "font.size": 10,
                "axes.titlesize": 12,
                "axes.labelsize": 10,
                "xtick.labelsize": 9,
                "ytick.labelsize": 9,
            }
        )

    # -----------------------------------------------------

    def _ensure_output_folders(self):
        self.output_folder.mkdir(parents=True, exist_ok=True)
        for folder_name in self.subfolders.values():
            (self.output_folder / folder_name).mkdir(parents=True, exist_ok=True)

    # -----------------------------------------------------

    def _load_data(self):
        analyzer = ExperimentAnalyzer(results_folder=self.repo_root / "results")
        analyzer.save_csv()
        self.df = pd.read_csv(self.csv_path)

    # -----------------------------------------------------

    def _format_label(self, column):
        return column.replace("_", " ").title()

    # -----------------------------------------------------

    def _save_plot(self, fig, filename, subfolder="distributions"):
        output_dir = self.output_folder / subfolder
        output_dir.mkdir(parents=True, exist_ok=True)
        fig.tight_layout()
        fig.savefig(output_dir / filename, dpi=300, bbox_inches="tight")
        plt.close(fig)

    # -----------------------------------------------------

    def plot_count(self, column, title, filename, subfolder="distributions", xlabel=None, ylabel="Count", order=None):
        if column not in self.df.columns:
            return

        counts = self.df[column].value_counts().reset_index()
        counts.columns = [column, "count"]

        if order is not None:
            counts[column] = pd.Categorical(counts[column], categories=order, ordered=True)
            counts = counts.sort_values(column)

        fig, ax = plt.subplots(figsize=(8, 5))
        sns.barplot(data=counts, x=column, y="count", color="#4C78A8", ax=ax)
        ax.set_title(title)
        ax.set_xlabel(xlabel or self._format_label(column))
        ax.set_ylabel(ylabel)
        ax.set_ylim(bottom=0)
        self._save_plot(fig, filename, subfolder=subfolder)

    # -----------------------------------------------------

    def plot_average(self, group_col, value_col, title, ylabel, filename, subfolder="performance", order=None):
        if group_col not in self.df.columns or value_col not in self.df.columns:
            return

        data = self.df.groupby(group_col)[value_col].mean().reset_index()
        if order is not None:
            data[group_col] = pd.Categorical(data[group_col], categories=order, ordered=True)
            data = data.sort_values(group_col)

        fig, ax = plt.subplots(figsize=(8, 5))
        sns.barplot(data=data, x=group_col, y=value_col, color="#4C78A8", ax=ax)
        ax.set_title(title)
        ax.set_xlabel(self._format_label(group_col))
        ax.set_ylabel(ylabel)
        ax.set_ylim(bottom=0)
        self._save_plot(fig, filename, subfolder=subfolder)

    # -----------------------------------------------------

    def plot_scatter(self, x_col, y_col, title, filename, subfolder="stress", xlabel=None, ylabel=None):
        if x_col not in self.df.columns or y_col not in self.df.columns:
            return

        fig, ax = plt.subplots(figsize=(7, 5))
        sns.scatterplot(data=self.df, x=x_col, y=y_col, hue="pressure", palette="viridis", s=90, ax=ax)
        ax.set_title(title)
        ax.set_xlabel(xlabel or self._format_label(x_col))
        ax.set_ylabel(ylabel or self._format_label(y_col))
        ax.legend(title="Pressure", bbox_to_anchor=(1.02, 1), loc="upper left")
        self._save_plot(fig, filename, subfolder=subfolder)

    # -----------------------------------------------------

    def plot_heatmap(self, filename="correlation_heatmap.png", subfolder="correlation"):
        numeric_df = self.df.select_dtypes(include=["number"])
        if numeric_df.empty:
            return

        fig, ax = plt.subplots(figsize=(10, 8))
        correlation = numeric_df.corr(numeric_only=True)
        sns.heatmap(correlation, annot=False, cmap="viridis", linewidths=0.5, ax=ax)
        ax.set_title("Correlation Heatmap of Numeric Experiment Metrics")
        self._save_plot(fig, filename, subfolder=subfolder)

    # -----------------------------------------------------

    def plot_distribution_charts(self):
        self.plot_count("pressure", "Pressure Distribution", "pressure_distribution.png")
        self.plot_count("personality", "Personality Distribution", "personality_distribution.png")
        self.plot_count("developer_role", "Developer Role Distribution", "developer_role_distribution.png")
        self.plot_count("behavior_strategy", "Behaviour Strategy Distribution", "behavior_strategy_distribution.png")
        self.plot_count("task_difficulty", "Task Difficulty Distribution", "task_difficulty_distribution.png")

    # -----------------------------------------------------

    def plot_performance_analysis(self):
        self.plot_average(
            "pressure",
            "performance_score",
            "Average Performance by Pressure",
            "Average Performance Score",
            "performance_by_pressure.png",
            subfolder="performance",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        self.plot_average(
            "personality",
            "performance_score",
            "Average Performance by Personality",
            "Average Performance Score",
            "performance_by_personality.png",
            subfolder="performance",
        )
        self.plot_average(
            "developer_role",
            "performance_score",
            "Average Performance by Developer Role",
            "Average Performance Score",
            "performance_by_role.png",
            subfolder="performance",
        )
        self.plot_average(
            "task_difficulty",
            "performance_score",
            "Average Performance by Task Difficulty",
            "Average Performance Score",
            "performance_by_difficulty.png",
            subfolder="performance",
        )

    # -----------------------------------------------------

    def plot_honesty_analysis(self):
        self.plot_average(
            "pressure",
            "honesty_score",
            "Average Honesty Score by Pressure",
            "Average Honesty Score",
            "honesty_by_pressure.png",
            subfolder="performance",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        self.plot_average(
            "personality",
            "honesty_score",
            "Average Honesty Score by Personality",
            "Average Honesty Score",
            "honesty_by_personality.png",
            subfolder="performance",
        )
        self.plot_average(
            "developer_role",
            "honesty_score",
            "Average Honesty Score by Developer Role",
            "Average Honesty Score",
            "honesty_by_role.png",
            subfolder="performance",
        )

    # -----------------------------------------------------

    def plot_deception_analysis(self):
        self.plot_average(
            "pressure",
            "deception_gap",
            "Average Deception Gap by Pressure",
            "Average Deception Gap",
            "deception_gap_by_pressure.png",
            subfolder="deception",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        self.plot_average(
            "personality",
            "deception_gap",
            "Average Deception Gap by Personality",
            "Average Deception Gap",
            "deception_gap_by_personality.png",
            subfolder="deception",
        )
        self.plot_average(
            "developer_role",
            "deception_gap",
            "Average Deception Gap by Developer Role",
            "Average Deception Gap",
            "deception_gap_by_role.png",
            subfolder="deception",
        )
        self.plot_average(
            "pressure",
            "auditor_score",
            "Average Auditor Score by Pressure",
            "Average Auditor Score",
            "auditor_score_by_pressure.png",
            subfolder="deception",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        if "deception_detected" in self.df.columns:
            detection_data = self.df.groupby("pressure")["deception_detected"].mean().reset_index()
            detection_data["deception_detected"] = detection_data["deception_detected"] * 100
            fig, ax = plt.subplots(figsize=(8, 5))
            sns.barplot(data=detection_data, x="pressure", y="deception_detected", color="#4C78A8", ax=ax)
            ax.set_title("Detection Rate by Pressure")
            ax.set_xlabel("Pressure")
            ax.set_ylabel("Detection Rate (%)")
            ax.set_ylim(bottom=0)
            self._save_plot(fig, "detection_rate_by_pressure.png", subfolder="deception")

    # -----------------------------------------------------

    def plot_quality_analysis(self):
        self.plot_average(
            "pressure",
            "bugs_introduced",
            "Average Bugs Introduced by Pressure",
            "Average Bugs Introduced",
            "bugs_by_pressure.png",
            subfolder="quality",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        self.plot_average(
            "personality",
            "bugs_introduced",
            "Average Bugs Introduced by Personality",
            "Average Bugs Introduced",
            "bugs_by_personality.png",
            subfolder="quality",
        )
        self.plot_average(
            "developer_role",
            "bugs_introduced",
            "Average Bugs Introduced by Developer Role",
            "Average Bugs Introduced",
            "bugs_by_role.png",
            subfolder="quality",
        )
        self.plot_average(
            "pressure",
            "code_quality",
            "Average Code Quality by Pressure",
            "Average Code Quality",
            "code_quality_by_pressure.png",
            subfolder="quality",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        self.plot_average(
            "personality",
            "code_quality",
            "Average Code Quality by Personality",
            "Average Code Quality",
            "code_quality_by_personality.png",
            subfolder="quality",
        )
        self.plot_average(
            "developer_role",
            "code_quality",
            "Average Code Quality by Developer Role",
            "Average Code Quality",
            "code_quality_by_role.png",
            subfolder="quality",
        )

    # -----------------------------------------------------

    def plot_stress_analysis(self):
        self.plot_average(
            "pressure",
            "stress_index",
            "Average Stress Index by Pressure",
            "Average Stress Index",
            "stress_by_pressure.png",
            subfolder="stress",
            order=["LOW", "MEDIUM", "HIGH", "EXTREME"],
        )
        self.plot_scatter(
            "stress_index",
            "performance_score",
            "Stress Index vs Performance",
            "stress_vs_performance.png",
            subfolder="stress",
            xlabel="Stress Index",
            ylabel="Performance Score",
        )
        self.plot_scatter(
            "stress_index",
            "deception_gap",
            "Stress Index vs Deception Gap",
            "stress_vs_deception_gap.png",
            subfolder="stress",
            xlabel="Stress Index",
            ylabel="Deception Gap",
        )

    # -----------------------------------------------------

    def plot_relationships(self):
        self.plot_scatter(
            "honesty_score",
            "performance_score",
            "Performance vs Honesty Score",
            "performance_vs_honesty.png",
            subfolder="correlation",
            xlabel="Honesty Score",
            ylabel="Performance Score",
        )
        self.plot_scatter(
            "code_quality",
            "performance_score",
            "Performance vs Code Quality",
            "performance_vs_code_quality.png",
            subfolder="correlation",
            xlabel="Code Quality",
            ylabel="Performance Score",
        )
        self.plot_scatter(
            "bugs_introduced",
            "code_quality",
            "Bugs Introduced vs Code Quality",
            "bugs_vs_code_quality.png",
            subfolder="correlation",
            xlabel="Bugs Introduced",
            ylabel="Code Quality",
        )
        self.plot_scatter(
            "bugs_introduced",
            "performance_score",
            "Bugs Introduced vs Performance",
            "bugs_vs_performance.png",
            subfolder="correlation",
            xlabel="Bugs Introduced",
            ylabel="Performance Score",
        )
        self.plot_scatter(
            "auditor_score",
            "deception_gap",
            "Auditor Score vs Deception Gap",
            "auditor_vs_deception_gap.png",
            subfolder="correlation",
            xlabel="Auditor Score",
            ylabel="Deception Gap",
        )

    # -----------------------------------------------------

    def run_all_visualizations(self):
        self.plot_distribution_charts()
        self.plot_performance_analysis()
        self.plot_honesty_analysis()
        self.plot_deception_analysis()
        self.plot_quality_analysis()
        self.plot_stress_analysis()
        self.plot_relationships()
        self.plot_heatmap()

        print(f"All visualizations saved in: {self.output_folder}")


def main():
    visualizer = ExperimentVisualizer()
    visualizer.run_all_visualizations()


if __name__ == "__main__":
    main()