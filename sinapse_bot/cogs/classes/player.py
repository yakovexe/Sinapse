import discord
from typing import Union

class Player():
    def __init__(self, author: Union[discord.user.User, discord.member.Member]) -> None:
        self.author = author 
        self.score = 0

    def update_score(self, points: int) -> None:
        self.score += points

    def get_score(self) -> int:
        return self.score
    
    def get_name(self) -> str:
        return self.author.name