import random
from typing import List
from cogs.classes.flashcard import Flashcard

class TriviaController():
    def __init__(self, flashcards):
        self.flashcards:List[Flashcard] = flashcards
        self.current_flashcard: Flashcard = None

    def set_random_flashcard_active(self):
        if self.current_flashcard is not None:
            self.flashcards.remove(self.current_flashcard)
        if(len(self.flashcards) != 0): 
            self.current_flashcard = random.choice(self.flashcards)
            return True
        else:
            return False
        
    def get_question(self):
        return self.current_flashcard.question
    
    def get_answer(self):
        return self.current_flashcard.answer
    
    def check_answer(self, user_answer):
        return self.current_flashcard.answer.lower() == user_answer.lower()

    def update_player_score(self, author):
        pass

    def get_results(self):
        pass