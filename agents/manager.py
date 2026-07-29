from agents.base_agent import BaseAgent
from utils.json_parser import parse_json_response
from models.task import Task


class ManagerAgent(BaseAgent):
    """
    AI Project Manager responsible for planning software development tasks.
    """

    def __init__(self):
        super().__init__(
            name="Alice",
            role="Project Manager",
            system_prompt="""
You are Alice, an experienced AI Project Manager leading a software development team.

Your responsibilities are:
- Break software features into realistic development tasks.
- Estimate effort.
- Assign priorities.
- Return ONLY valid JSON.
- Never include markdown or explanations.
"""
        )

    def create_sprint_tasks(self, feature: str, number_of_tasks: int):
        """
        Generate sprint tasks for a given software feature.
        """

        prompt = f"""
Create exactly {number_of_tasks} software development tasks
for implementing this feature:

Feature:
{feature}

Return ONLY valid JSON.

Use this exact format:

[
  {{
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "priority": "High",
    "estimated_hours": 4
  }}
]

Rules:
- Return exactly {number_of_tasks} tasks.
- Priority must be High, Medium, or Low.
- estimated_hours must be an integer.
- No markdown.
- No explanation.
- No extra text.
"""

        response = self.think(prompt)

        task_data = parse_json_response(response)

        if task_data is None:
            return []

        tasks = []

        for task in task_data:
            tasks.append(Task(**task))

        return tasks