from simulation.simulator import SoftwareCompanySimulator
from models.environment import PressureLevel


def main():

    simulator = SoftwareCompanySimulator()

    simulator.run(
        pressure=PressureLevel.HIGH
    )


if __name__ == "__main__":
    main()