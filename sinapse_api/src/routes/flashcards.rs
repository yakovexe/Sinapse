use std::str::FromStr;

use actix_web::{
    delete, get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, oid::ObjectId, Document};
use mongodb::{Client, Collection};

use crate::models::flashcard::Flashcard;
use crate::utils::db::*;

const DATABASE: &str = "SinapseDB";
const FLASHCARDS: &str = "flashcards";

#[post("/flashcards")]
pub async fn post_flashcard(
    client: web::Data<Client>,
    Json(flashcard): web::Json<Flashcard>,
) -> HttpResponse {
    if flashcard.deck_id.is_empty() || flashcard.question.is_empty() || flashcard.answer.is_empty()
    {
        return HttpResponse::BadRequest().body("deck_id, question and answer are required");
    }
    let collection: Collection<Flashcard> = client.database(DATABASE).collection(FLASHCARDS);
    match collection.insert_one(flashcard).await {
        Ok(result) => {
            let flashcard_id = result
                .inserted_id
                .as_object_id()
                .unwrap()
                .to_hex()
                .to_string();
            HttpResponse::Created().body(flashcard_id)
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/flashcards/{deck_id}")]
pub async fn get_flashcards(client: web::Data<Client>, deck_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<Flashcard> = client.database(DATABASE).collection(FLASHCARDS);

    let filter: Document = doc! { "deck_id": deck_id.to_string() };

    let result: Result<Vec<Flashcard>, mongodb::error::Error> =
        find_all_documents(&collection, filter).await;

    match result {
        Ok(flashcards) => HttpResponse::Ok().json(flashcards),
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

#[delete("/flashcards/{flashcard_id}")]
pub async fn delete_flashcard(
    client: web::Data<Client>,
    flashcard_id: web::Path<String>,
) -> HttpResponse {
    let collection: Collection<Flashcard> = client.database(DATABASE).collection(FLASHCARDS);

    let object_id = match ObjectId::from_str(&flashcard_id) {
        Ok(id) => id,
        Err(err) => {
            return HttpResponse::BadRequest().body(format!("Invalid ObjectId: {}", err));
        }
    };

    let filter: Document = doc! { "_id":  object_id };

    let result = collection.delete_one(filter).await;

    match result {
        Ok(_) => HttpResponse::Ok().body(flashcard_id.to_string()),
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}
