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
            HttpResponse::Created().body(user_id)
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

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
