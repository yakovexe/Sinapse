use actix_web::{
    get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, Document};
use futures_util::StreamExt;
use mongodb::{Client, Collection};

use crate::models::flashcard::Flashcard;

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
        Ok(_) => HttpResponse::Created().body("Flashcard created!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// Solution based on https://stackoverflow.com/questions/67036017/how-to-get-collection-of-document-from-mongodb-cursor
#[get("/flashcards/{deck_id}")]
pub async fn get_flashcards(client: web::Data<Client>, deck_id: web::Path<String>) -> HttpResponse {
    let database = client.database(DATABASE);
    let collection = database.collection::<Flashcard>(FLASHCARDS);

    let filter: Document = doc! { "deck_id": deck_id.to_string() };

    match collection.find(filter).await {
        Ok(mut cursor) => {
            let mut flashcards: Vec<Flashcard> = Vec::new();
            while let Some(result) = cursor.next().await {
                match result {
                    Ok(document) => flashcards.push(document),
                    Err(err) => {
                        return HttpResponse::InternalServerError().body(format!("Error: {}", err))
                    }
                }
            }
            HttpResponse::Ok().json(flashcards)
        }
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

// TODO: #[delete("/flashcards/{id}")]
