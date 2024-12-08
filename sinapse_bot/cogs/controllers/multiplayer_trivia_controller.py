import discord
from cogs.controllers.trivia_controller import TriviaController
from cogs.classes.player import Player
from cogs.classes.flashcard import Flashcard
from typing import List, Union

class MultiplayerTriviaController(TriviaController):
    def __init__(self, flashcards: List[Flashcard]) -> None:
        super().__init__(flashcards)
        self.players = []

    def set_random_flashcard_active(self) -> bool:
        return super().set_random_flashcard_active()

    def check_answer(self, user_answer) -> bool:
        return super().check_answer(user_answer)

    def get_question(self) -> str:
        return super().get_question()
    
    def get_answer(self) -> str:
        return super().get_answer()
    
    def update_player_score(self, author: Union[discord.user.User, discord.member.Member], score: int) -> None:
        if(any(getattr(player, "author", None) == author for player in self.players)):
            self.players[self.players.index(next(player for player in self.players if getattr(player, "author", None) == author))].update_score(score)
        else:
            newPlayer = Player(author)
            newPlayer.update_score(score)
            self.players.append(newPlayer)

    def get_results(self) -> str:
        scores = [(player.get_name(), player.score) for player in self.players]
        scores.sort(key=lambda x: x[1], reverse=True)
        result = ""
        for name, score in scores:
            result += f"{name}: {score} pontos\n"
        return result

