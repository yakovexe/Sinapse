# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

import discord
from discord.ext import commands
from discord.ext.commands import Context
from cogs.utils.pagination import Pagination

from cogs.services.deck_service import DeckService

deck_service = DeckService()
L = 10

class Decks(commands.Cog, name="Decks"):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="decks", description="Show decks available")
    async def decks(self, context: Context, user_id: str = None) -> None:
        decks = await deck_service.get_decks(user_id)

        async def get_page(page: int):
            emb = discord.Embed(title="Decks do Usuário", description="")
            offset = (page-1) * L
            for deck in decks[offset:offset+L]:
                emb.description += f"{deck['name']} - {deck['id']}\n"
            n = Pagination.compute_total_pages(len(decks), L)
            emb.set_footer(text=f"Página {page} de {n}")
            return emb, n

        await Pagination(context, get_page).navigate()


async def setup(bot) -> None:
    await bot.add_cog(Decks(bot))