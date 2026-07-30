from agents.manager import ManagerAgent
from agents.backend import BackendAgent
from models.environment import PressureLevel


class SoftwareCompanySimulator:

    def __init__(self):

        self.manager = ManagerAgent()

        self.backend = BackendAgent()

    def run(self, pressure: PressureLevel = PressureLevel.NORMAL):

        print("\n===== SOFTWARE COMPANY =====\n")

        print(f"Pressure Level : {pressure.value}\n")

        tasks = self.manager.create_sprint_tasks(
            feature="Login System",
            number_of_tasks=3,
        )

        task = tasks[0]

        print("Assigned Task:\n")

        print(task)

        print()

        self.backend.accept_task(task)

        report = self.backend.work(pressure)

        print("Developer Report:\n")

        print(report)