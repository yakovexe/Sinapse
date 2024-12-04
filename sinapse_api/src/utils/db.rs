//! # Módulo de Utilitários para MongoDB
//!
//! Este módulo fornece funções auxiliares para interagir com o MongoDB, incluindo a criação de um cliente e a busca de documentos em uma coleção.
//!
//! ## Funções Disponíveis
//!
//! ### `get_database_client`
//! Cria um cliente MongoDB usando uma URI.
//!
//! - **Parâmetros**:
//!   - `uri`: Uma `&str` contendo a URI de conexão com o MongoDB.
//! - **Retorno**:
//!   - `Result<Client>`: Retorna uma instância do cliente MongoDB ou um erro em caso de falha.
//!
//! ### `find_all_documents`
//! Busca todos os documentos de uma coleção com base em um filtro fornecido.
//!
//! - **Parâmetros**:
//!   - `collection`: Referência para a coleção MongoDB.
//!   - `filter`: Filtro `Document` para consulta.
//! - **Retorno**:
//!   - `Result<Vec<T>>`: Retorna um vetor de documentos ou um erro.
//!
//! ## Exemplo de Uso
//! ```rust
//! use mongodb::bson::doc;
//! use crate::utils::db::{get_database_client, find_all_documents};
//!
//! #[tokio::main]
//! async fn main() -> mongodb::error::Result<()> {
//!     let client = get_database_client("mongodb://localhost:27017").await?;
//!     let collection = client.database("test_db").collection("test_collection");
//!     let documents = find_all_documents(&collection, doc! {}).await?;
//!     println!("{:?}", documents);
//!     Ok(())
//! }
//! ```

use futures_util::StreamExt;
use mongodb::{bson::Document, error::Result, Client, Collection};
use serde::de::DeserializeOwned;

/// Cria um cliente MongoDB a partir de uma URI.
///
/// # Parâmetros
/// - `uri`: String de conexão para o MongoDB.
///
/// # Retorno
/// - `Result<Client>`: Cliente MongoDB ou um erro caso a conexão falhe.
///
/// # Exemplo
/// ```rust
/// let client = get_database_client("mongodb://localhost:27017").await?;
/// ```
pub async fn get_database_client(uri: &str) -> Result<Client> {
    Client::with_uri_str(uri).await
}

/// Retorna todos os documentos de uma coleção com base no filtro fornecido.
///
/// # Parâmetros
/// - `collection`: Referência para uma coleção MongoDB.
/// - `filter`: Filtro BSON usado para consultar documentos.
///
/// # Retorno
/// - `Result<Vec<T>>`: Vetor de documentos ou erro.
///
/// # Exemplo
/// ```rust
/// let documents = find_all_documents(&collection, doc! {}).await?;
/// ```
pub async fn find_all_documents<T>(collection: &Collection<T>, filter: Document) -> Result<Vec<T>>
where
    T: DeserializeOwned,
    T: Send,
    T: Sync,
{
    match collection.find(filter).await {
        Ok(mut cursor) => {
            let mut documents: Vec<T> = Vec::new();
            while let Some(result) = cursor.next().await {
                match result {
                    Ok(document) => documents.push(document),
                    Err(err) => return Err(err),
                }
            }
            Ok(documents)
        }
        Err(err) => Err(err),
    }
}
