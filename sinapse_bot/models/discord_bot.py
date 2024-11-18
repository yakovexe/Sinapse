from discord.ext import commands
from player import Player

class DiscordBot(commands.Cog):
    def __init__(self, bot, trivia_game) -> None:
        self.bot = bot
        self.trivia_game = trivia_game

    @commands.command(name="start_trivia")
    async def start_trivia(self, ctx) -> None:
        question = self.trivia_game.start_game()
        await ctx.send(question)

    @commands.command(name="answer")
    async def answer(self, ctx, *, user_answer) -> None:
        player = self.get_player(ctx.author)
        if self.trivia_game.check_answer(player, user_answer):
            await ctx.send(f"Correct! {player.name} now has {player.score} points!")
        else:
            await ctx.send("Wrong answer!")

    def get_player(self, user: Player) -> Player:
        for player in self.trivia_game.players:
            if player.name == user.name:
                return player
        new_player = Player(user.name)
        self.trivia_game.add_player(new_player)
        return new_player