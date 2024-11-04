use std::collections;

use actix_web::{web, App, HttpResponse, HttpServer};
use serde::{Serialize, Deserialize};
use mongodb::{bson::Document, Client, Collection};

const DB_NAME: &str = "SinapseDB";
const COLL_NAME: &str = "flashcards";

// TODO: MOVE TO MODEL DIR
#[derive(Debug, Serialize, Deserialize)]
struct Flashcard {
    question: String,
    answer: String,
}

// TODO: MOVE TO ROUTES DIR 
async fn index() -> HttpResponse {
    // PLACEHOLDER CODE
    HttpResponse::Ok().body("INDEX")
}

async fn post_flashcard(client: web::Data<Client>, flashcard: web::Json<Flashcard>) -> HttpResponse {
    let collection: Collection<Flashcard>  = client.database(DB_NAME).collection(COLL_NAME);
    match collection.insert_one(flashcard.into_inner()).await {
        Ok(_) => HttpResponse::Created().body("Flashcard created!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

async fn get_flashcards() -> HttpResponse {
    // PLACEHOLDER CODE
    HttpResponse::Ok().body("GET")
}

// Bootstraps and initialize the application
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = "mongodb://127.0.0.1:27017";
    let client = Client::with_uri_str(uri).await.expect("ERROR: database connection failed.");

    println!("{}", format!("http://127.0.0.1:8080"));
    HttpServer::new(move || {
        // App Object
        // - Routing
        // - Shared Data
        // - Separation of Concerns
        App::new()
            // .app_data(<app shared data/state>) goes here
            .app_data(web::Data::new(client.clone()))
            .route("/", web::get().to(index))
            .service(
                web::scope("/v1").service(
                    web::resource("/flashcard")
                        .route(web::post().to(post_flashcard))
                        .route(web::get().to(get_flashcards))
                )
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
