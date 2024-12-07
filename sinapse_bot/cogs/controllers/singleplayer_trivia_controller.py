from cogs.controllers.trivia_controller import TriviaController

class SingleplayerTriviaController(TriviaController):
    def __init__(self, flashcards):
        super().__init__(flashcards)

    def set_random_flashcard_active(self):
        return super().set_random_flashcard_active()

    def get_results(self):
        return super().get_results()
    
    def check_answer(self, user_answer):
        return super().check_answer(user_answer)
    
    def get_question(self):
        return super().get_question()
