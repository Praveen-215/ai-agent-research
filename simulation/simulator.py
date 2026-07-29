from agents.manager import ManagerAgent


class SoftwareCompanySimulator:
    """
    Coordinates all AI agents.
    """

    def __init__(self):

        self.manager = ManagerAgent()

    def run(self):

        print("\n===== SOFTWARE COMPANY =====\n")

        tasks = self.manager.create_sprint_tasks(
            feature="Login System",
            number_of_tasks=3,
        )

        for task in tasks:
            print(task)
            print("-" * 50)