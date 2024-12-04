export class DeckService {
  async createDeck(userId: string, deckName: string) {
    const response = await fetch("http://127.0.0.1:8080/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, name: deckName }),
    });
    const data = await response.json();
    return data;
  }
  async getDecks(userId: string) {
    const response = await fetch(`http://127.0.0.1:8080/decks/${userId}`);
    const data = await response.json();
    return data;
  }
  async getDeck(id: string) {
    const response = await fetch(`http://127.0.0.1:8080/deck/${id}`);
    const data = await response.json();
    return data;
  }
  async deleteDeck(id: string) {
    const response = await fetch(`http://127.0.0.1:8080/decks/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
}
