use actix_web::{
    delete, get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, oid::ObjectId, Document};
use mongodb::{Client, Collection, Database};
use std::str::FromStr;

use crate::{
    models::{
        deck::{Deck, ResponseDeck},
        flashcard::Flashcard,
    },
    utils::db::find_all_documents,
};

const DATABASE: &str = "SinapseDB";
const DECKS: &str = "decks";
const FLASHCARDS: &str = "flashcards";

#[post("/decks")]
async fn post_deck(client: web::Data<Client>, Json(deck): web::Json<Deck>) -> HttpResponse {
    let collection: Collection<Deck> = client.database(DATABASE).collection(DECKS);

    match collection.insert_one(deck).await {
        Ok(result) => {
            let deck_id = result
                .inserted_id
                .as_object_id()
                .unwrap()
                .to_hex()
                .to_string();
            HttpResponse::Created().body(deck_id)
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/decks/{user_id}")]
pub async fn get_decks(client: web::Data<Client>, user_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<Document> = client.database(DATABASE).collection(DECKS);

    let filter: Document = doc! { "user_id": user_id.to_string() };

    let result: Result<Vec<Document>, mongodb::error::Error> =
        find_all_documents(&collection, filter).await;

    match result {
        Ok(documents) => {
            let response_decks: Vec<ResponseDeck> = documents
                .iter()
                .map(|doc| {
                    let object_id = doc.get("_id").unwrap().as_object_id().unwrap();
                    ResponseDeck {
                        id: object_id.to_hex().to_string(),
                        user_id: doc.get_str("user_id").unwrap().to_string(),
                        name: doc.get_str("name").unwrap().to_string(),
                    }
                })
                .collect();

            HttpResponse::Ok().json(response_decks)
        }
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

#[get("/deck/{deck_id}")]
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

#[delete("/decks/{deck_id}")]
pub async fn delete_deck(client: web::Data<Client>, deck_id: web::Path<String>) -> HttpResponse {
    let database: Database = client.database(DATABASE);
    let decks: Collection<Deck> = database.collection(DECKS);
    let flashcards: Collection<Flashcard> = database.collection(FLASHCARDS);

    let object_id = match ObjectId::from_str(&deck_id) {
        Ok(id) => id,
        Err(err) => {
            return HttpResponse::BadRequest().body(format!("Invalid ObjectId: {}", err));
        }
    };

    match flashcards
        .delete_many(doc! { "deck_id": deck_id.to_string() })
        .await
    {
        Ok(result) => result,
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    };

    match decks.delete_one(doc! { "_id":  object_id }).await {
        Ok(_) => HttpResponse::Ok().body(deck_id.to_string()),
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}
