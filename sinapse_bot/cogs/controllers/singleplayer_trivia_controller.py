from typing import List, Union

import discord
from cogs.controllers.trivia_controller import TriviaController
from cogs.classes.player import Player
from cogs.classes.flashcard import Flashcard

class SingleplayerTriviaController(TriviaController):
    def __init__(self, flashcards: List[Flashcard], author: Union[discord.user.User, discord.member.Member]) -> None:
        super().__init__(flashcards)
        self.player = Player(author)

    def set_random_flashcard_active(self) -> None:
        return super().set_random_flashcard_active()

    def get_results(self) -> list:
        return super().get_results()
    
    def check_answer(self, user_answer) -> bool:
        return super().check_answer(user_answer)
    
    def get_question(self) -> str:
        return super().get_question()
    
    def get_answer(self) -> str:
        return super().get_answer()
    
    def update_player_score(self, _: Union[discord.user.User, discord.member.Member]) -> None:
        self.player.update_score(1)

    def get_results(self) -> str:
        return "Seu total de pontos foi "+ str(self.player.get_score()) + "!"
