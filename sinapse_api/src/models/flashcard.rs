use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Flashcard {
    deck_id: String,
    question: String,
    answer: String,
}
