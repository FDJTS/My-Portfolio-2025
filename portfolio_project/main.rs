use std::io::{self, Write};

struct User {
    name: String,
    password: String,
}

impl User {
    fn validate_password(&self, input: &str) -> bool {
        self.password == input
    }

    fn show_welcome_message(&self) {
        println!("Welcome, {}!", self.name);
    }
}

fn main() {
    let user = User {
        name: String::from("Zyad"),
        password: String::from("12345"),
    };

    let mut username = String::new();
    let mut password = String::new();

    print!("Enter Username: ");
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut username).unwrap();

    print!("Enter Password: ");
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut password).unwrap();

    // Remove newline characters
    let username = username.trim();
    let password = password.trim();

    if user.validate_password(password) {
        user.show_welcome_message();
    } else {
        println!("Invalid credentials!");
    }
}
