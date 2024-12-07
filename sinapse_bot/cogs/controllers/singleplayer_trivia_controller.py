from cogs.controllers.trivia_controller import TriviaController
from cogs.classes.player import Player

class SingleplayerTriviaController(TriviaController):
    def __init__(self, flashcards, author):
        super().__init__(flashcards)
        self.player = Player(author)

    def set_random_flashcard_active(self):
        return super().set_random_flashcard_active()

    def get_results(self):
        return super().get_results()
    
    def check_answer(self, user_answer):
        return super().check_answer(user_answer)
    
    def get_question(self):
        return super().get_question()
    
    def get_answer(self):
        return super().get_answer()
    
    def update_player_score(self, _):
        self.player.update_score(1)

    def get_results(self):
        return "Seu total de pontos foi "+ str(self.player.get_score()) + "!"
