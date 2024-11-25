use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Flashcard {
    question: String,
    answer: String,
}
