use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Flashcard {
    pub deck_id: String,
    pub question: String,
    pub answer: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseFlashcard {
    pub id: String,
    pub deck_id: String,
    pub question: String,
    pub answer: String,
}
