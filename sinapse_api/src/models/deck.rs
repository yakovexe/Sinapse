use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Deck {
    pub user_id: String,
    pub name: String,
}
