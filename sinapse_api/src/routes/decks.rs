use actix_web::{
    get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, Document};
use mongodb::{Client, Collection};

use crate::{models::deck::Deck, utils::db::find_all_documents};

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

// TODO: #[get("/decks/{id}")]

// TODO: #[delete("/decks/{id}")]
