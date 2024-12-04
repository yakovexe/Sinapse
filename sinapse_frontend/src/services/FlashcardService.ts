export class FlashcardService {
  async getFlashcards(deck_id: string) {
    const response = await fetch(`http://127.0.0.1:8080/flashcards/${deck_id}`);
    const data = await response.json();
    return data;
  }

  async deleteFlashcard(id: string) {
    const response = await fetch(`http://127.0.0.1:8080/flashcards/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }

  async createFlashcard(deck_id: string, question: string, answer: string) {
    const response = await fetch("http://127.0.0.1:8080/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deck_id: deck_id,
        question: question,
        answer: answer,
      }),
    });
    const data = await response.json();
    return data;
  }
}
