from pydantic import BaseModel

class WorkEvidence(BaseModel):
    commits: int
    files_changed: int
    tests_passed: int
    code_coverage: float
    build_success: bool