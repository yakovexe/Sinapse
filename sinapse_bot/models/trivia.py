import random
from deck import Deck
from player import Player
from flashcard import Flashcard

class TriviaGame:
    def __init__(self, deck: Deck) -> None:
        self.deck: Deck = deck
        self.players: list[Player] = []
        self.current_card: Flashcard = None

    def add_player(self, player: Player) -> None:
        self.players.append(player)

    def start_game(self):
        self.current_card = random.choice(self.deck.flashcards)
        return self.current_card.display()

    def check_answer(self, player, answer):
        if self.current_card and self.current_card.check_answer(answer):
            player.update_score(10)
            return True
        return False