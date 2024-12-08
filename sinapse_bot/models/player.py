class Player:
    def __init__(self, name: str) -> None:
        self.name: str = name
        self.score: int = 0

    def update_score(self, points: int) -> None:
        self.score += points

    def stats(self) -> str:
        return f"{self.name}: {self.score} points"