import random


class BugGenerator:

    @staticmethod
    def generate(role, difficulty):

        base = {
            "EASY": 2,
            "MEDIUM": 5,
            "HARD": 10
        }

        bugs = base[difficulty.value]

        if role == "Backend Developer":
            bugs += random.randint(1, 3)

        elif role == "Frontend Developer":
            bugs += random.randint(0, 2)

        elif role == "QA Engineer":
            bugs = 0

        elif role == "DevOps Engineer":
            bugs += random.randint(0, 1)

        return bugs