# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

import discord
from discord.ext import commands
from discord.ext.commands import Context
from discord import app_commands
from dotenv import load_dotenv
import os

load_dotenv()

Guild_ID = os.getenv("GUILD_ID")

class Ping(commands.Cog, name="Ping"):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="ping", description="Returns Pong")
    @app_commands.guilds(discord.Object(id=Guild_ID))
    async def ping(self, context: Context):
        await context.send("Pong")

async def setup(bot) -> None:
    await bot.add_cog(Ping(bot))