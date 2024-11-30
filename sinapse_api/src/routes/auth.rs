use actix_web::web::{self, Json};
use actix_web::{post, HttpResponse};
use mongodb::{Client, Collection};

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
        Ok(_) => HttpResponse::Created().body("User created!"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// TODO: #[get("/users/{id}")]
