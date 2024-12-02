use actix_web::{
    get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, Document};
use mongodb::{Client, Collection};

use crate::{
    models::{deck::Deck, flashcard::Flashcard},
    utils::db::find_all_documents,
};

const DATABASE: &str = "SinapseDB";
const DECKS: &str = "decks";
const FLASHCARDS: &str = "flashcards";

#[post("/decks")]
async fn post_deck(client: web::Data<Client>, Json(deck): web::Json<Deck>) -> HttpResponse {
    let collection: Collection<Deck> = client.database(DATABASE).collection(DECKS);

    match collection.insert_one(deck).await {
        Ok(_) => HttpResponse::Created().body("Deck created!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/decks/{user_id}")]
pub async fn get_decks(client: web::Data<Client>, user_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<Deck> = client.database(DATABASE).collection(DECKS);

    let filter: Document = doc! { "user_id": user_id.to_string() };

    let result: Result<Vec<Deck>, mongodb::error::Error> =
        find_all_documents(&collection, filter).await;

    match result {
        Ok(decks) => HttpResponse::Ok().json(decks),
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

#[get("/decks/{deck_id}")]
pub async fn get_deck(client: web::Data<Client>, deck_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<Flashcard> = client.database(DATABASE).collection(FLASHCARDS);

    let filter: Document = doc! { "deck_id": deck_id.to_string() };

    let result: Result<Vec<Flashcard>, mongodb::error::Error> =
        find_all_documents(&collection, filter).await;

    match result {
        Ok(flashcards) => HttpResponse::Ok().json(flashcards),
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

// TODO: #[delete("/decks/{id}")]
