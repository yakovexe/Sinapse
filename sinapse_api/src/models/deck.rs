use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Deck {
    pub user_id: String,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseDeck {
    pub id: String,
    pub user_id: String,
    pub name: String,
}
