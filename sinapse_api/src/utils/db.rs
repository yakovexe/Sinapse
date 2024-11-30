use mongodb::{error::Result, Client};

pub async fn get_database_client(uri: &str) -> Result<Client> {
    Client::with_uri_str(uri).await
}
