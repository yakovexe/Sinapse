//! # Endpoint de Índice com Actix-Web
//!
//! Este módulo implementa um endpoint básico que retorna uma resposta simples "INDEX".
//!
//! ## Endpoints
//!
//! ### `GET /`
//! Retorna uma resposta de status 200 com o corpo "INDEX".
//!
//! - **Response**:
//!   - `200 OK`: Retorna o texto "INDEX".
//!
//! ## Exemplos
//! ```bash
//! curl http://localhost:8080/
//! # Resposta: "INDEX"
//! ```

use actix_web::{get, HttpResponse, Responder};

/// Endpoint raiz (`/`) que retorna uma resposta "INDEX".
///
/// # Retornos
/// - `200 OK`: Resposta com o corpo "INDEX".
#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("INDEX")
}
