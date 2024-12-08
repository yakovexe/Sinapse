from typing import List, Dict

import requests

from cogs.classes.flashcard import Flashcard



class DeckService:
    async def get_decks(self, user_id: str) -> List[Dict[str, str]]:
        response = requests.get(f"http://127.0.0.1:8080/decks/{user_id}")
        data = response.json()
        return data

    async def get_deck(self, id: str) -> List[Flashcard]:
        response = requests.get(f"http://127.0.0.1:8080/deck/{id}")
        data = response.json()
        flashcards = []
        for flashcard in data:
            flashcards.append(Flashcard(**flashcard))
        return flashcards