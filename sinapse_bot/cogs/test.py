# Based on template by Krypton: https://github.com/kkrypt0nn/Python-Discord-Bot-Template/tree/main

import discord
from discord.ext import commands
from cogs.utils.pagination import Pagination
import os
from discord.ext.commands import Context

users = [f"User {i}" for i in range(1, 10000)]
# This is a long list of results
# I'm going to use pagination to display the data
L = 10    # elements per page

class Test(commands.Cog, name="Pagination"):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(name="test", description="Test")
    async def test(self, context: Context):
        async def get_page(page: int):
            emb = discord.Embed(title="The Users", description="")
            offset = (page-1) * L
            for user in users[offset:offset+L]:
                emb.description += f"{user}\n"
            emb.set_author(name=f"Requested by {context.author}")
            n = Pagination.compute_total_pages(len(users), L)
            emb.set_footer(text=f"Página {page} de {n}")
            return emb, n

        await Pagination(context, get_page).navigate()

async def setup(bot) -> None:
    await bot.add_cog(Test(bot))