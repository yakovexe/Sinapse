use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Flashcard {
    pub deck_id: String,
    pub question: String,
    pub answer: String,
}
