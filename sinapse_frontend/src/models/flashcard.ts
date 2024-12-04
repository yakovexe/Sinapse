export interface Flashcard {
  deck_id: string;
  question: string;
  answer: string;
}

export interface FlashcardWithId extends Flashcard {
  id: string;
}
