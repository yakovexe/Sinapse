class Flashcard:
    def __init__(self, deck_id, question, answer):
        self.deck_id = deck_id
        self.question = question
        self.answer = answer

    def check_answer(self, answer):
        return self.answer == answer