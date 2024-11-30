use actix_web::{
    get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, Document};
use futures_util::StreamExt;
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

#[get("/decks/{user_id}")]
pub async fn get_decks(client: web::Data<Client>, user_id: web::Path<String>) -> HttpResponse {
    let database = client.database(DATABASE);
    let collection = database.collection::<Deck>(DECKS);

    let filter: Document = doc! { "user_id": user_id.to_string() };

    match collection.find(filter).await {
        Ok(mut cursor) => {
            let mut decks: Vec<Deck> = Vec::new();
            while let Some(result) = cursor.next().await {
                match result {
                    Ok(document) => decks.push(document),
                    Err(err) => {
                        return HttpResponse::InternalServerError().body(format!("Error: {}", err))
                    }
                }
            }
            HttpResponse::Ok().json(decks)
        }
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

// TODO: #[get("/decks/{id}")]

// TODO: #[delete("/decks/{id}")]
