from pydantic import BaseModel


class WorkDecision(BaseModel):
    """
    Internal reasoning result of a developer.
    """

    actual_progress: int

    confidence: float

    reasoning: str