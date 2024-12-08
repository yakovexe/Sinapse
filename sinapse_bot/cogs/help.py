# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

from discord.ext import commands
from discord.ext.commands import Context
from dotenv import load_dotenv

load_dotenv()

class Help(commands.Cog, name="Help"):
    def __init__(self, bot) -> None:
        self.bot = bot

    @commands.hybrid_command(name="help", description="Returns a list of commands and usage tips")
    async def help(self, context: Context) -> None:
        await context.send('''
`!help`: list of commands and usage tips
`!decks`: <user_id> load decks from user account
`!play`: <deck_id> starts a multi or solo game using the deck
''')

async def setup(bot) -> None:
    await bot.add_cog(Help(bot))