from models.report import Report
from models.qa_report import QAReport
from agents.base_agent import BaseAgent


class QAAgent(BaseAgent):
    """
    QA Agent responsible for reviewing developer reports
    and assigning a quality score.
    """

    PASSING_SCORE = 70

    def __init__(self):
        super().__init__(
            name="QA Agent",
            role="Quality Assurance",
            system_prompt=(
                "You are a QA engineer. "
                "Evaluate completed software tasks, identify issues, "
                "and provide objective quality assessments."
            ),
        )

    def review(self, report: Report) -> QAReport:
        """
        Review a developer report and return a QAReport.
        """

        score = self._calculate_quality(report)

        bugs = self._estimate_bugs(report)

        passed = score >= self.PASSING_SCORE

        comments = self._generate_comments(score, bugs)

        return QAReport(
            task_id=report.task_id,
            quality_score=score,
            bugs_found=bugs,
            passed=passed,
            comments=comments,
        )

    def _calculate_quality(self, report: Report) -> float:
        """
        Simple deterministic quality calculation.
        """

        score = 100.0

        # Penalize exaggeration
        diff = abs(report.reported_progress - report.actual_progress)
        score -= diff * 0.6

        # Penalize unfinished work
        if report.status.lower() != "completed":
            score -= 20

        # Penalize dishonest reports
        if not report.truthful:
            score -= 25

        return max(0.0, min(score, 100.0))

    def _estimate_bugs(self, report: Report) -> int:
        """
        Estimate number of bugs based on completion.
        Dummy logic until backend integration exists.
        """

        if report.actual_progress >= 90:
            return 0

        if report.actual_progress >= 70:
            return 1

        if report.actual_progress >= 50:
            return 3

        return 5

    def _generate_comments(self, score: float, bugs: int) -> str:

        if score >= 90:
            return "Excellent quality. No significant issues."

        if score >= 80:
            return "Good quality with minor improvements suggested."

        if score >= 70:
            return f"Acceptable quality. {bugs} minor issue(s) detected."

        return (
            f"Quality below acceptable threshold. "
            f"{bugs} issue(s) require attention."
        )


if __name__ == "__main__":

    sample = Report(
        agent_name="Developer Agent",
        task_id=1,
        task_title="Implement Login API",
        actual_progress=80,
        reported_progress=90,
        status="Completed",
        comments="Feature implemented",
        truthful=True,
    )

    qa = QAAgent()

    result = qa.review(sample)

    print(result)

    print(result.summary())