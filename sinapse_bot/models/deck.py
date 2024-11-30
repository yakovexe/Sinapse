import requests
from flashcard import Flashcard

class Deck():
    def __init__(self, api_url: str, user_token: str, flashcards: list[Flashcard]) -> None:
        self.api_url: str = api_url
        self.user_token: str = user_token
        self.flashcards: Flashcard = flashcards

    def fetch_flashcards(self) -> None:
        response = requests.get(f"{self.api_url}/v1/flashcard", headers={"Authorization": f"Bearer {self.user_token}"})
        if response.status_code == 200:
            self.flashcards = [Flashcard(**fc) for fc in response.json()]
        else:
            raise Exception("Failed to fetch flashcards from API")