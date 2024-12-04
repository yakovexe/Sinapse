//! # API de Decks e Flashcards com Actix-Web e MongoDB
//!
//! Este módulo implementa endpoints para gerenciar **decks** e **flashcards** utilizando **Actix-Web** e **MongoDB**.
//!
//! ## Endpoints
//!
//! ### `POST /decks`
//! Cria um novo deck no banco de dados.
//!
//! - **Request Body**: JSON representando o deck com campos necessários (ex.: `name`, `user_id`).
//! - **Response**:
//!   - `201 Created`: Retorna o `ID` do deck criado.
//!   - `500 Internal Server Error`: Erro durante a criação do deck.
//!
//! ---
//!
//! ### `GET /decks/{user_id}`
//! Retorna todos os decks associados a um usuário específico.
//!
//! - **Parâmetros**:
//!   - `user_id`: O identificador do usuário.
//! - **Response**:
//!   - `200 OK`: Retorna uma lista de decks associados ao `user_id`.
//!   - `500 Internal Server Error`: Erro ao buscar decks.
//!
//! ---
//!
//! ### `GET /deck/{deck_id}`
//! Retorna todos os flashcards de um deck específico.
//!
//! - **Parâmetros**:
//!   - `deck_id`: O identificador do deck.
//! - **Response**:
//!   - `200 OK`: Retorna uma lista de flashcards pertencentes ao deck.
//!   - `500 Internal Server Error`: Erro ao buscar flashcards.
//!
//! ---
//!
//! ### `DELETE /decks/{deck_id}`
//! Exclui um deck e seus flashcards associados do banco de dados.
//!
//! - **Parâmetros**:
//!   - `deck_id`: O identificador do deck a ser excluído.
//! - **Response**:
//!   - `200 OK`: Deck e seus flashcards excluídos com sucesso.
//!   - `400 Bad Request`: `deck_id` inválido.
//!   - `500 Internal Server Error`: Erro durante a exclusão.
//!
//! ## Constantes
//!
//! - `DATABASE`: Nome do banco de dados MongoDB (`SinapseDB`).
//! - `DECKS`: Nome da coleção de decks (`decks`).
//! - `FLASHCARDS`: Nome da coleção de flashcards (`flashcards`).

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

/// Cria um novo deck no banco de dados.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `deck`: Objeto JSON representando o deck.
///
/// # Retornos
/// - `201 Created`: Deck criado.
/// - `500 Internal Server Error`: Falha ao criar o deck.
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

/// Retorna todos os decks de um usuário.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `user_id`: ID do usuário.
///
/// # Retornos
/// - `200 OK`: Lista de decks.
/// - `500 Internal Server Error`: Falha ao buscar decks.
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
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

/// Retorna todos os flashcards de um deck.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `deck_id`: ID do deck.
///
/// # Retornos
/// - `200 OK`: Lista de flashcards.
/// - `500 Internal Server Error`: Falha ao buscar flashcards.
#[get("/deck/{deck_id}")]
pub async fn get_deck(client: web::Data<Client>, deck_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<Flashcard> = client.database(DATABASE).collection(FLASHCARDS);

    let filter: Document = doc! { "deck_id": deck_id.to_string() };

    let result: Result<Vec<Flashcard>, mongodb::error::Error> =
        find_all_documents(&collection, filter).await;

    match result {
        Ok(flashcards) => HttpResponse::Ok().json(flashcards),
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

/// Exclui um deck e seus flashcards associados.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `deck_id`: ID do deck a ser excluído.
///
/// # Retornos
/// - `200 OK`: Deck excluído.
/// - `400 Bad Request`: ID inválido.
/// - `500 Internal Server Error`: Falha ao excluir o deck.
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
        Ok(_) => (),
        Err(err) => return HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    };

    match decks.delete_one(doc! { "_id": object_id }).await {
        Ok(_) => HttpResponse::Ok().body(deck_id.to_string()),
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}
