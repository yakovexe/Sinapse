use actix_web::{web, App, HttpServer};

mod models;
mod routes;
mod utils;

use routes::auth::post_user;
use routes::decks::{delete_deck, get_deck, get_decks, post_deck};
use routes::flashcards::{delete_flashcard, get_flashcards, post_flashcard};
use routes::index::index;
use utils::db::get_database_client;

// Bootstraps and initialize the application
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = "mongodb://127.0.0.1:27017";
    let client = get_database_client(uri)
        .await
        .expect("ERROR: database connection failed.");

    println!("Server running at http://127.0.0.1:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(index)
            .service(post_flashcard)
            .service(get_flashcards)
            .service(delete_flashcard)
            .service(post_user)
            .service(post_deck)
            .service(get_deck)
            .service(get_decks)
            .service(delete_deck)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
