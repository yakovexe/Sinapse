use actix_web::{web, App, HttpResponse, HttpServer};
use bson::{doc, Document};
use futures_util::StreamExt;
use mongodb::{Client, Collection};
use serde::{Deserialize, Serialize};

const DATABASE: &str = "SinapseDB";
const FLASHCARDS: &str = "flashcards";

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

async fn post_flashcard(
    client: web::Data<Client>,
    flashcard: web::Json<Flashcard>,
) -> HttpResponse {
    let collection: Collection<Flashcard> = client.database(DATABASE).collection(FLASHCARDS);
    match collection.insert_one(flashcard.into_inner()).await {
        Ok(_) => HttpResponse::Created().body("Flashcard created!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// Solution based on https://stackoverflow.com/questions/67036017/how-to-get-collection-of-document-from-mongodb-cursor
async fn get_flashcards(client: web::Data<Client>) -> HttpResponse {
    let database = client.database(DATABASE);
    let collection = database.collection::<Flashcard>(FLASHCARDS);

    let filter: Document = doc! { "question": { "$exists": true }, "answer": { "$exists": true } };

    // Fetch all documents from the collection
    match collection.find(filter).await {
        Ok(mut cursor) => {
            let mut flashcards = Vec::new();

            // Collect all documents
            while let Some(result) = cursor.next().await {
                match result {
                    Ok(document) => flashcards.push(document),
                    Err(err) => {
                        return HttpResponse::InternalServerError().body(format!("Error: {}", err))
                    }
                }
            }

            // Return the documents as JSON
            HttpResponse::Ok().json(flashcards)
        }
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

// Bootstraps and initialize the application
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = "mongodb://127.0.0.1:27017";
    let client = Client::with_uri_str(uri)
        .await
        .expect("ERROR: database connection failed.");

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
                        .route(web::get().to(get_flashcards)),
                ),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
