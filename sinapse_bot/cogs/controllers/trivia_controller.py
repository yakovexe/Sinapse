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
        else:
            return None
        
    def get_question(self):
        return self.current_flashcard.question
    
    def check_answer(self, user_answer):
        return self.current_flashcard.check_answer(user_answer)

    def get_results(self):
        pass