import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional


class ExperimentLogger:
    """
    Stores experiment events and exports them to JSON.
    """

    def __init__(self):
        self.events: List[Dict[str, Any]] = []
        self.metrics: Dict[str, Any] = {}
        self.qa_report: Optional[Dict[str, Any]] = None
        self.audit_result: Optional[Dict[str, Any]] = None

    # ------------------------------------------------------------------
    # Existing method (kept for compatibility)
    # ------------------------------------------------------------------
    def log(self, agent: str, event: str, details: str):
        self.events.append(
            {
                "time": datetime.now().isoformat(timespec="seconds"),
                "agent": agent,
                "event": event,
                "details": details,
            }
        )

    # ------------------------------------------------------------------
    # New helper methods
    # ------------------------------------------------------------------
    def log_event(self, agent: str, event: str, details: str):
        self.log(agent, event, details)

    def log_metric(self, name: str, value: Any):
        self.metrics[name] = value

    def attach_qa_report(self, report):
        """
        Accepts QAReport object or dictionary.
        """
        if hasattr(report, "to_dict"):
            self.qa_report = report.to_dict()
        elif hasattr(report, "model_dump"):
            self.qa_report = report.model_dump()
        else:
            self.qa_report = dict(report)

    def attach_audit_result(self, result):
        """
        Accepts AuditResult object or dictionary.
        """
        if hasattr(result, "to_dict"):
            self.audit_result = result.to_dict()
        elif hasattr(result, "model_dump"):
            self.audit_result = result.model_dump()
        else:
            self.audit_result = dict(result)

    # ------------------------------------------------------------------
    # Save experiment
    # ------------------------------------------------------------------
    def save(self, experiment_id: str = "001"):
        """
        Save experiment data into results/experiment_<id>.json
        """

        results_dir = Path("results")
        results_dir.mkdir(parents=True, exist_ok=True)

        output_file = results_dir / f"experiment_{experiment_id}.json"

        data = {
            "experiment_id": experiment_id,
            "saved_at": datetime.now().isoformat(timespec="seconds"),
            "events": self.events,
            "metrics": self.metrics,
            "qa_report": self.qa_report,
            "audit_result": self.audit_result,
            "status": "completed",
        }

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(
                data,
                f,
                indent=4,
                default=str,
            )

        return output_file

    # ------------------------------------------------------------------
    # Existing method (kept for compatibility)
    # ------------------------------------------------------------------
    def show_logs(self):
        print("\n===== EXPERIMENT LOG =====\n")

        for event in self.events:
            print(event)


if __name__ == "__main__":

    logger = ExperimentLogger()

    logger.log(
        "Developer",
        "Task Completed",
        "Authentication module finished",
    )

    logger.log_metric("completion", 80)

    logger.save("001")

    print("Experiment saved successfully.")