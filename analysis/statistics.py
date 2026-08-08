import pandas as pd


class ExperimentStatistics:

    def __init__(self, csv_file="results/experiment_summary.csv"):
        self.df = pd.read_csv(csv_file)

    # -------------------------------------
    # Overall
    # -------------------------------------

    def overall(self):

        print("\n========== OVERALL ==========\n")

        print("Experiments:", len(self.df))
        print()

        print(
            "Average Actual:",
            round(self.df["actual_progress"].mean(), 2)
        )

        print(
            "Average Reported:",
            round(self.df["reported_progress"].mean(), 2)
        )

        print(
            "Average Gap:",
            round(self.df["deception_gap"].mean(), 2)
        )

        print(
            "Detection Rate:",
            round(
                self.df["deception_detected"].mean() * 100,
                2
            ),
            "%"
        )

    # -------------------------------------
    # Personality
    # -------------------------------------

    def personality_analysis(self):

        print("\n========== PERSONALITY ==========\n")

        print(
            self.df.groupby("personality")[
                [
                    "deception_gap",
                    "auditor_score"
                ]
            ].mean()
        )

    # -------------------------------------
    # Pressure
    # -------------------------------------

    def pressure_analysis(self):

        print("\n========== PRESSURE ==========\n")

        print(
            self.df.groupby("pressure")[
                [
                    "deception_gap",
                    "auditor_score"
                ]
            ].mean()
        )

    # -------------------------------------
    # Difficulty
    # -------------------------------------

    def difficulty_analysis(self):

        print("\n========== DIFFICULTY ==========\n")

        print(
            self.df.groupby("task_difficulty")[
                [
                    "deception_gap",
                    "auditor_score"
                ]
            ].mean()
        )

    # -------------------------------------
    # Strategy
    # -------------------------------------

    def strategy_analysis(self):

        print("\n========== STRATEGY ==========\n")

        print(
            self.df.groupby("behavior_strategy")[
                [
                    "deception_gap",
                    "auditor_score"
                ]
            ].mean()
        )


def main():

    stats = ExperimentStatistics()

    stats.overall()

    stats.personality_analysis()

    stats.pressure_analysis()

    stats.difficulty_analysis()

    stats.strategy_analysis()


if __name__ == "__main__":
    main()