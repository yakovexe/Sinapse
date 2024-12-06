import discord
from typing import Callable, Optional
from discord.ext.commands import Context


class Pagination(discord.ui.View):
    def __init__(self, context: Context, get_page: Callable):
        self.context = context
        self.get_page = get_page
        self.total_pages: Optional[int] = None
        self.index = 1
        super().__init__(timeout=100)

    # async def context_check(self, context: Context) -> bool:
    #     if context.author == self.context.author:
    #         return True
    #     else:
    #         emb = discord.Embed(
    #             description=f"Only the author of the command can perform this action.",
    #             color=16711680
    #         )
    #         self.message = await context.send(embed=emb, ephemeral=True)
    #         return False

    async def navigate(self):
        emb, self.total_pages = await self.get_page(self.index)
        if self.total_pages == 1:
            self.message = await self.context.send(embed=emb)
        elif self.total_pages > 1:
            self.update_buttons()
            self.message = await self.context.send(embed=emb, view=self)

    async def edit_page(self, interaction: discord.Interaction):
        emb, self.total_pages = await self.get_page(self.index)
        await self.message.edit(embed=emb, view=self)

    def update_buttons(self):
        if self.index > self.total_pages // 2:
            self.children[2].emoji = "⏮️"
        else:
            self.children[2].emoji = "⏭️"
        self.children[0].disabled = self.index == 1
        self.children[1].disabled = self.index == self.total_pages

    @discord.ui.button(emoji="◀️", style=discord.ButtonStyle.blurple)
    async def previous(self, interaction: discord.Interaction, button: discord.Button):
        await interaction.response.defer()
        self.index -= 1
        await self.edit_page(interaction)

    @discord.ui.button(emoji="▶️", style=discord.ButtonStyle.blurple)
    async def next(self, interaction: discord.Interaction, button: discord.Button):
        await interaction.response.defer()
        self.index += 1
        await self.edit_page(interaction)

    @discord.ui.button(emoji="⏭️", style=discord.ButtonStyle.blurple)
    async def end(self, interaction: discord.Interaction, button: discord.Button):
        await interaction.response.defer()
        if self.index <= self.total_pages//2:
            self.index = self.total_pages
        else:
            self.index = 1
            
        await self.edit_page(interaction)

    async def on_timeout(self):
        # remove buttons on timeout
        await self.message.edit(view=None)

    @staticmethod
    def compute_total_pages(total_results: int, results_per_page: int) -> int:
        return ((total_results - 1) // results_per_page) + 1