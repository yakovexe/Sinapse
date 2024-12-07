from cogs.controllers.trivia_controller import TriviaController
from cogs.classes.player import Player

class MultiplayerTriviaController(TriviaController):
    def __init__(self, flashcards):
        super().__init__(flashcards)
        self.players = []

    def set_random_flashcard_active(self):
        return super().set_random_flashcard_active()
    
    def check_answer(self, user_answer):
        return super().check_answer(user_answer)
    
    def get_question(self):
        return super().get_question()
    
    def get_answer(self):
        return super().get_answer()
    
    def update_player_score(self, author):
        if(any(getattr(player, "author", None) == author for player in self.players)):
            self.players[self.players.index(next(player for player in self.players if getattr(player, "author", None) == author))].update_score(1)
        else:
            self.players.append(Player(author))

    def get_results(self):
        scores = [(player.get_name(), player.score) for player in self.players]
        scores.sort(key=lambda x: x[1], reverse=True)
        result = ""
        for name, score in scores:
            result += f"{name}: {score} pontos\n"
        return result

