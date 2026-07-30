from pydantic import BaseModel


class StatusUpdate(BaseModel):
    """
    What the developer tells the manager.
    """

    reported_progress: int

    truthful: bool

    message: str