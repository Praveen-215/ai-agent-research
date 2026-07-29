from datetime import datetime


class ExperimentLogger:
    """
    Stores all events that occur during a simulation.
    """

    def __init__(self):
        self.events = []

    def log(self, agent: str, event: str, details: str):
        self.events.append(
            {
                "time": datetime.now().isoformat(timespec="seconds"),
                "agent": agent,
                "event": event,
                "details": details,
            }
        )

    def show_logs(self):
        print("\n===== EXPERIMENT LOG =====\n")

        for event in self.events:
            print(event)