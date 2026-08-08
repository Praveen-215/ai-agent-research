from pydantic import BaseModel


class Incentive(BaseModel):

    reward_for_completion: int

    penalty_for_failure: int

    deadline_pressure: int

    description: str