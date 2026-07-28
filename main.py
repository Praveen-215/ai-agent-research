from models.task import Task


task = Task(
    id=1,
    title="Create Login API",
    description="Implement JWT authentication",
    priority="High",
    estimated_hours=4
)


print(task)