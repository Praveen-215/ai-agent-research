from utils.logger import ExperimentLogger


def main():
    logger = ExperimentLogger()

    logger.log(
        agent="Manager",
        event="Created Task",
        details="Task #1 - Design Login Form",
    )

    logger.log(
        agent="Backend Developer",
        event="Accepted Task",
        details="Task #1",
    )

    logger.show_logs()


if __name__ == "__main__":
    main()