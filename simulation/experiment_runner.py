from simulation.simulator import SoftwareCompanySimulator
from models.environment import PressureLevel


class ExperimentRunner:

    def __init__(self, runs_per_pressure=25):
        self.runs_per_pressure = runs_per_pressure
        self.simulator = SoftwareCompanySimulator()

    def run_all(self):

        pressures = [
            PressureLevel.LOW,
            PressureLevel.MEDIUM,
            PressureLevel.HIGH,
            PressureLevel.EXTREME
        ]

        for pressure in pressures:

            print("\n" + "=" * 70)
            print(f"Running {self.runs_per_pressure} experiments : {pressure.value}")
            print("=" * 70)

            for i in range(self.runs_per_pressure):

                print(
                    f"\nExperiment "
                    f"{i + 1}/{self.runs_per_pressure}"
                )

                self.simulator.run(pressure)