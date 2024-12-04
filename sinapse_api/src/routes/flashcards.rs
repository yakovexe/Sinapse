//! # API de Flashcards com Actix-Web e MongoDB
//!
//! Este módulo implementa uma API REST para gerenciar flashcards utilizando **Actix-Web** e **MongoDB**.
//!
//! ## Endpoints
//!
//! ### `POST /flashcards`
//! Cria um novo flashcard no banco de dados.
//!
//! - **Request Body**: JSON representando o flashcard com os seguintes campos obrigatórios:
//!   - `deck_id`: Identificador do deck associado.
//!   - `question`: Pergunta do flashcard.
//!   - `answer`: Resposta do flashcard.
//! - **Response**:
//!   - `201 Created`: Retorna o `ID` do flashcard criado.
//!   - `400 Bad Request`: Quando algum campo obrigatório está ausente ou inválido.
//!   - `500 Internal Server Error`: Erro durante a criação do flashcard.
//!
//! ---
//!
//! ### `GET /flashcards/{deck_id}`
//! Retorna todos os flashcards de um deck específico.
//!
//! - **Parâmetros**:
//!   - `deck_id`: Identificador do deck.
//! - **Response**:
//!   - `200 OK`: Lista de flashcards associados ao `deck_id`.
//!   - `500 Internal Server Error`: Erro ao buscar flashcards.
//!
//! ---
//!
//! ### `DELETE /flashcards/{flashcard_id}`
//! Exclui um flashcard específico do banco de dados.
//!
//! - **Parâmetros**:
//!   - `flashcard_id`: Identificador do flashcard a ser excluído.
//! - **Response**:
//!   - `200 OK`: Flashcard excluído com sucesso.
//!   - `400 Bad Request`: `flashcard_id` inválido (formato incorreto).
//!   - `500 Internal Server Error`: Erro durante a exclusão.
//!
//! ## Constantes
//!
//! - `DATABASE`: Nome do banco de dados MongoDB (`SinapseDB`).
//! - `FLASHCARDS`: Nome da coleção de flashcards (`flashcards`).
//!

use std::str::FromStr;

use actix_web::{
    delete, get, post,
    web::{self, Json},
    HttpResponse,
};
use bson::{doc, oid::ObjectId, Document};
use mongodb::{Client, Collection};
use serde_json::json;

use crate::models::flashcard::{Flashcard, ResponseFlashcard};
use crate::utils::db::*;

const DATABASE: &str = "SinapseDB";
const FLASHCARDS: &str = "flashcards";

/// Cria um novo flashcard no banco de dados.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `flashcard`: Objeto JSON representando o flashcard.
///
/// # Retornos
/// - `201 Created`: Flashcard criado.
/// - `400 Bad Request`: Falha devido a campos obrigatórios ausentes ou inválidos (como um `deck_id` vazio, uma pergunta ou resposta vazia).
/// - `500 Internal Server Error`: Falha ao criar o flashcard (erro no banco de dados).
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
            HttpResponse::Created().json(json!({"id": flashcard_id}))
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
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
/// - `500 Internal Server Error`: Falha ao buscar flashcards (erro no banco de dados).
#[get("/flashcards/{deck_id}")]
pub async fn get_flashcards(client: web::Data<Client>, deck_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<Document> = client.database(DATABASE).collection(FLASHCARDS);

    let filter: Document = doc! { "deck_id": deck_id.to_string() };

    let result: Result<Vec<Document>, mongodb::error::Error> =
        find_all_documents(&collection, filter).await;

    match result {
        Ok(documents) => {
            let response_flashcards: Vec<ResponseFlashcard> = documents
                .iter()
                .map(|doc| {
                    let object_id = doc.get("_id").unwrap().as_object_id().unwrap();
                    ResponseFlashcard {
                        id: object_id.to_hex().to_string(),
                        deck_id: doc.get_str("deck_id").unwrap().to_string(),
                        question: doc.get_str("question").unwrap().to_string(),
                        answer: doc.get_str("answer").unwrap().to_string(),
                    }
                })
                .collect();

            HttpResponse::Ok().json(response_flashcards)
        }
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

/// Exclui um flashcard específico.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `flashcard_id`: ID do flashcard.
///
/// # Retornos
/// - `200 OK`: Flashcard excluído.
/// - `400 Bad Request`: ID inválido (formato incorreto do `flashcard_id`).
/// - `500 Internal Server Error`: Falha ao excluir o flashcard (erro no banco de dados).
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
        Ok(_) => HttpResponse::Ok().json(json!({"id": flashcard_id.to_string()})),
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}
