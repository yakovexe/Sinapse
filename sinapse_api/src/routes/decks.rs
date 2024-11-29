use actix_web::{get, post, web, HttpResponse};
use bson::{doc, Document};
use futures_util::StreamExt;
use mongodb::{Client, Collection};

use crate::models::deck::Deck;

const DATABASE: &str = "SinapseDB";
const DECKS: &str = "decks";

// TODO: #[post("/decks")]

// TODO: #[get("/decks")]

// TODO: #[get("/decks/{id}")]

// TODO: #[delete("/decks/{id}")]
