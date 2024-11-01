use actix_web::{web, App, HttpResponse, HttpServer};
use serde::Deserialize;

// TODO: MOVE TO MODEL DIR
#[allow(dead_code)]
#[derive(Debug, Deserialize)]
struct Flashcard {
    question: String,
    answer: String,
}

// TODO: MOVE TO ROUTES DIR 
async fn index() -> HttpResponse {
    // PLACEHOLDER CODE
    HttpResponse::Ok().body("INDEX")
}

async fn post_flashcard(flashcard: web::Json<Flashcard>) -> HttpResponse {
    println!("Received flashcard: {:?}", flashcard);
    HttpResponse::Created().body("Flashcard created!")
}

async fn get_flashcards() -> HttpResponse {
    // PLACEHOLDER CODE
    HttpResponse::Ok().body("GET")
}

// Bootstraps and initialize the application
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("{}", format!("http://127.0.0.1:8080"));
    HttpServer::new(|| {
        // App Object
        // - Routing
        // - Shared Data
        // - Separation of Concerns
        App::new()
            // .app_data(<app shared data/state>) goes here
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
