class Player:
    def __init__(self, name: str):
        self.name: str = name
        self.score: int = 0

    def update_score(self, points: int):
        self.score += points

    def stats(self):
        return f"{self.name}: {self.score} points"