class TeamDependency:

    @staticmethod
    def adjust_progress(results):
        """
        results = {
            "Backend Developer": experiment,
            "Frontend Developer": experiment,
            "QA Engineer": experiment,
            "DevOps Engineer": experiment
        }
        """

        backend = results.get("Backend Developer")
        frontend = results.get("Frontend Developer")
        qa = results.get("QA Engineer")
        devops = results.get("DevOps Engineer")

        # Frontend depends on Backend
        if backend and frontend:
            if backend.actual_progress < 40:
                frontend.actual_progress = max(
                    0,
                    frontend.actual_progress - 15
                )

        # QA depends on Backend + Frontend
        if qa:
            if (
                backend.actual_progress < 50
                or frontend.actual_progress < 50
            ):
                qa.actual_progress = max(
                    0,
                    qa.actual_progress - 20
                )

        # DevOps depends on Backend
        if devops:
            if backend.actual_progress < 60:
                devops.actual_progress = max(
                    0,
                    devops.actual_progress - 10
                )

        return results