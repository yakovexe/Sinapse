//! # API de Usuários com Actix-Web e MongoDB
//!
//! Este módulo implementa uma API para gerenciamento de usuários utilizando o framework Actix-Web e o MongoDB como banco de dados.
//!
//! ## Endpoints
//!
//! ### `POST /users`
//! Insere um novo usuário no banco de dados.
//!
//! - **Request Body**: Um objeto JSON representando o usuário contendo `username` e `password`.
//! - **Response**:
//!   - `201 Created`: Retorna o `ID` do usuário criado.
//!   - `400 Bad Request`: Quando o `username` ou `password` estão ausentes.
//!   - `500 Internal Server Error`: Quando ocorre um erro interno.
//!
//! ### `GET /users/{user_id}`
//! Retorna um usuário pelo seu `ID`.
//!
//! - **Parâmetros**:
//!   - `user_id`: O `ObjectId` do usuário no MongoDB.
//! - **Response**:
//!   - `200 OK`: Retorna o `username` e o `ID` do usuário encontrado.
//!   - `404 Not Found`: Quando o usuário não é encontrado.
//!   - `400 Bad Request`: Quando o `ID` fornecido é inválido.
//!   - `500 Internal Server Error`: Quando ocorre um erro interno.
//!
//! ## Constantes
//!
//! - `DATABASE`: Nome do banco de dados MongoDB utilizado (`SinapseDB`).
//! - `USERS`: Nome da coleção de usuários (`users`).
//!
use std::str::FromStr;

use actix_web::web::{self, Json};
use actix_web::{get, post, HttpResponse};
use bson::oid::ObjectId;
use bson::{doc, Document};
use mongodb::{Client, Collection};
use serde_json::json;

use crate::models::user::User;

const DATABASE: &str = "SinapseDB";
const USERS: &str = "users";

/// Insere um novo usuário no banco de dados.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `user`: Objeto JSON contendo `username` e `password`.
///
/// # Retornos
/// - `201 Created`: Se o usuário for criado com sucesso.
/// - `400 Bad Request`: Se o `username` ou `password` forem vazios.
/// - `500 Internal Server Error`: Se ocorrer um erro.
#[post("/users")]
async fn post_user(client: web::Data<Client>, Json(user): web::Json<User>) -> HttpResponse {
    if user.password.is_empty() || user.username.is_empty() {
        return HttpResponse::BadRequest().body("Username and password are required");
    }
    let collection: Collection<User> = client.database(DATABASE).collection(USERS);
    match collection.insert_one(user).await {
        Ok(result) => {
            let user_id = result
                .inserted_id
                .as_object_id()
                .unwrap()
                .to_hex()
                .to_string();
            HttpResponse::Created().json(json!({"id": user_id}))
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

/// Retorna informações de um usuário pelo seu `ID`.
///
/// # Parâmetros
/// - `client`: Instância do cliente MongoDB.
/// - `user_id`: `ID` do usuário no MongoDB.
///
/// # Retornos
/// - `200 OK`: Se o usuário for encontrado.
/// - `404 Not Found`: Se o usuário não for encontrado.
/// - `400 Bad Request`: Se o `ID` for inválido.
/// - `500 Internal Server Error`: Se ocorrer um erro.
#[get("/users/{user_id}")]
pub async fn get_user(client: web::Data<Client>, user_id: web::Path<String>) -> HttpResponse {
    let collection: Collection<User> = client.database(DATABASE).collection(USERS);

    let object_id = match ObjectId::from_str(&user_id) {
        Ok(id) => id,
        Err(err) => {
            return HttpResponse::BadRequest().body(format!("Invalid ObjectId: {}", err));
        }
    };

    let filter: Document = doc! { "_id": object_id };

    match collection.find_one(filter).await {
        Ok(Some(user)) => {
            let value = json!({
                "id": object_id.to_string(),
                "username": user.username,
            });
            HttpResponse::Ok().json(value)
        }
        Ok(None) => HttpResponse::NotFound().body("User not found"),
        Err(err) => HttpResponse::InternalServerError().body(format!("Error: {}", err)),
    }
}

#[post("/users/auth")]
pub async fn auth_user(client: web::Data<Client>, Json(user): web::Json<User>) -> HttpResponse {
    let collection: Collection<Document> = client.database(DATABASE).collection(USERS);

    let filter = doc! {
        "username": &user.username,
        "password": &user.password,
    };

    match collection.find_one(filter).await {
        Ok(Some(doc)) => match doc.get_object_id("_id") {
            Ok(object_id) => HttpResponse::Ok().json(json!({"id": object_id.to_string()})),
            Err(_) => HttpResponse::InternalServerError().body("Failed to retrieve ObjectId"),
        },
        Ok(None) => HttpResponse::NotFound().body("User not found"),
        Err(err) => HttpResponse::InternalServerError().body(format!("Database error: {}", err)),
    }
}
