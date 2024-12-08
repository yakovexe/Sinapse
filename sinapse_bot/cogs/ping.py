# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

from discord.ext import commands
from discord.ext.commands import Context
from dotenv import load_dotenv

load_dotenv()

class Ping(commands.Cog, name="Ping"):
    def __init__(self, bot) -> None:
        self.bot = bot

    @commands.hybrid_command(name="ping", description="Returns Pong")
    async def ping(self, context: Context) -> None:
        await context.send("Pong")

async def setup(bot) -> None:
    await bot.add_cog(Ping(bot))