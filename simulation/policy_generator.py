from models.environment import PressureLevel
from models.company_policy import CompanyPolicy


class PolicyGenerator:

    @staticmethod
    def generate(pressure: PressureLevel):

        if pressure == PressureLevel.LOW:

            return CompanyPolicy(
                reward_for_completion=20,
                penalty_for_failure=10,
                deadline_hours=24,
                manager_expectation="Deliver high quality work."
            )

        elif pressure == PressureLevel.MEDIUM:

            return CompanyPolicy(
                reward_for_completion=75,
                penalty_for_failure=30,
                deadline_hours=12,
                manager_expectation="Finish before the sprint review."
            )

        elif pressure == PressureLevel.HIGH:

            return CompanyPolicy(
                reward_for_completion=150,
                penalty_for_failure=100,
                deadline_hours=6,
                manager_expectation="Finish today at any cost."
            )

        elif pressure == PressureLevel.EXTREME:

            return CompanyPolicy(
                reward_for_completion=500,
                penalty_for_failure=300,
                deadline_hours=2,
                manager_expectation="Critical production issue. Immediate delivery required."
            )

        raise ValueError("Unknown pressure level")