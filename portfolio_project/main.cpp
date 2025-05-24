#include <iostream>
#include <string>

class User {
public:
    User(std::string name, std::string password) : name(name), password(password) {}

    bool validatePassword(std::string input) {
        return password == input;
    }

    void showWelcomeMessage() {
        std::cout << "Welcome, " << name << "!" << std::endl;
    }

private:
    std::string name;
    std::string password;
};

int main() {
    std::string username, password;
    
    std::cout << "Enter Username: ";
    std::cin >> username;
    std::cout << "Enter Password: ";
    std::cin >> password;

    // Create user with predefined password
    User user("Zyad", "12345");

    // Check if password matches
    if (user.validatePassword(password)) {
        user.showWelcomeMessage();
    } else {
        std::cout << "Invalid credentials!" << std::endl;
    }

    return 0;
}
