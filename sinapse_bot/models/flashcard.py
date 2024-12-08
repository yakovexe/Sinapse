class Flashcard:
    def __init__(self, question: str, answer: str, deck_id: int) -> None:
        self.question: str = question
        self.answer: str = answer
        self.deck_id: int = deck_id
    
    def show_flashcard(self) -> str:
        return f'Question: {self.question}'

    def check_answer(self, user_answer: str) -> bool:
        return self.answer == user_answer