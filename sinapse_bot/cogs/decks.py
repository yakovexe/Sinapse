# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

import discord
from discord.ext import commands
from discord.ext.commands import Context
from discord import app_commands
from dotenv import load_dotenv
import os
import random
import asyncio

load_dotenv()

class Decks(commands.Cog, name="Decks"):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="decks", description="Show decks available")
    async def decks(self, context: Context, *, deck_name: str = None) -> None:
        self.current_question = random.choice(self.questions)
        await context.send(self.current_question["question"])
        await self.wait_for_answer(context)

    async def wait_for_answer(self, context: Context) -> None:
        def check(message):
            return message.author == context.author and message.channel == context.channel

        try:
            message = await self.bot.wait_for('message', check=check, timeout=30)
        except asyncio.TimeoutError:
            await context.send("Acabou o tempo!")
            return

        if message.content.lower() == self.current_question["answer"].lower():
            await context.send("Certo!")
        else:
            await context.send(f"A resposta era {self.current_question['answer']}")

        self.current_question = None

async def setup(bot) -> None:
    await bot.add_cog(Decks(bot))