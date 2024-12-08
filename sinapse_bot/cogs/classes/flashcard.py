class Flashcard:
    def __init__(self, deck_id: str, question: str, answer: str) -> None:
        self.deck_id = deck_id
        self.question = question
        self.answer = answer

    def check_answer(self, answer: str) -> bool:
        return self.answer == answer