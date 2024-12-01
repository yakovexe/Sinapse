use futures_util::StreamExt;
use mongodb::{bson::Document, error::Result, Client, Collection};
use serde::de::DeserializeOwned;

pub async fn get_database_client(uri: &str) -> Result<Client> {
    Client::with_uri_str(uri).await
}

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
