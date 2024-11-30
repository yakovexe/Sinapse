use actix_web::web::{self, Json};
use actix_web::{post, HttpResponse};
use mongodb::{Client, Collection};

use crate::models::deck::Deck;

const DATABASE: &str = "SinapseDB";
const DECKS: &str = "decks";

#[post("/decks")]
async fn post_deck(client: web::Data<Client>, Json(deck): web::Json<Deck>) -> HttpResponse {
    let collection: Collection<Deck> = client.database(DATABASE).collection(DECKS);
    match collection.insert_one(deck).await {
        Ok(_) => HttpResponse::Created().body("Deck created!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// TODO: #[get("/decks")]

// TODO: #[get("/decks/{id}")]

// TODO: #[delete("/decks/{id}")]
