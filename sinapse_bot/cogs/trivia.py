import discord
from discord.ext import commands
from discord.ext.commands import Context
from discord import app_commands
from dotenv import load_dotenv
import os
import random
import asyncio

load_dotenv()

Guild_ID = os.getenv("GUILD_ID")

class Trivia(commands.Cog, name="Trivia"):
    def __init__(self, bot):
        self.bot = bot
        self.questions = [
            {
                "question": "Capital da França",
                "answer": "Paris"
            },
            {
                "question": "Maior planeta do sistema solar",
                "answer": "Jupiter"
            }
            # Add more questions here
        ]
        self.current_question = None

    @commands.hybrid_command(name="trivia", description="Start a trivia game")
    @app_commands.guilds(discord.Object(id=Guild_ID))
    async def start_trivia(self, context: Context):
        self.current_question = random.choice(self.questions)
        await context.send(self.current_question["question"])
        await self.wait_for_answer(context)

    async def wait_for_answer(self, context: Context):
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
            await context.send(f"Errado! A resposta era {self.current_question['answer']}")

        self.current_question = None

async def setup(bot) -> None:
    await bot.add_cog(Trivia(bot))