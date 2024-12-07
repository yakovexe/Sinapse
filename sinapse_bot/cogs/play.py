# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

import discord
from discord.ext import commands
from discord.ext.commands import Context
from discord import app_commands
import random
import asyncio
from cogs.controllers.singleplayer_trivia_controller import SingleplayerTriviaController
from cogs.controllers.multiplayer_trivia_controller import MultiplayerTriviaController
from cogs.services.deck_service import DeckService

deck_service = DeckService()

class Play(commands.Cog, name="Play"):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="play", description="Start a trivia game")
    async def play(self, context: Context, deck_id: str = None) -> None:
        flashcards = await deck_service.get_deck(deck_id)

        if(len(flashcards) == 0):
            await context.send("Deck vazio ou inexistente!")
            return

        await context.send("Digite 'solo' para jogar sozinho ou 'multi' para jogar com amigos.")
        # self.current_question = random.choice(self.questions)
        # await context.send(self.current_question["question"])
        await self.wait_for_trivia_type(context, flashcards)

    async def wait_for_trivia_type(self, context: Context, flashcards) -> None:
        def check(message):
            return message.author == context.author and message.channel == context.channel
        
        try:
            message = await self.bot.wait_for('message', check=check, timeout=30)
        except asyncio.TimeoutError:
            await context.send("Acabou o tempo!")
            return

        if message.content.lower() == "solo":
            print("solo")
            self.trivia_controller = SingleplayerTriviaController(flashcards)
        elif message.content.lower() == "multi":
            print("multi")
            self.trivia_controller = MultiplayerTriviaController(flashcards)
        else:
            await context.send("Resposta inválida. Tente novamente.")
            await self.wait_for_trivia_type(context)
            return
        await self.start_question(context)

    async def start_question(self, context: Context) -> None:
        self.trivia_controller.set_random_flashcard_active()
        print(self.trivia_controller.get_question())
        await context.send(self.trivia_controller.get_question())
        await self.wait_for_answer(context)

    async def wait_for_answer(self, context: Context) -> None:
        # def check(message):
        #     return message.author == context.author and message.channel == context.channel

        try:
            message = await self.bot.wait_for('message', check=None, timeout=30)
        except asyncio.TimeoutError:
            await context.send("Acabou o tempo!")
            return

        if message.content.lower() == self.current_question["answer"].lower():
            await context.send("Certo!")
        else:
            await context.send(f"A resposta era {self.current_question['answer']}")

        self.current_question = None

async def setup(bot) -> None:
    await bot.add_cog(Play(bot))