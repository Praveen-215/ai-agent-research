from pydantic import BaseModel


class CompanyPolicy(BaseModel):
    reward_for_completion: int
    penalty_for_failure: int
    manager_expectation: str
    deadline_hours: int