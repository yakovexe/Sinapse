
class Player():
    def __init__(self, author):
        self.author = author 
        self.score = 0

    def update_score(self, points):
        self.score += points

    def get_score(self):
        return self.score
    
    def get_name(self):
        return self.author.name