<?php
$users = json_decode(file_get_contents('users.json'), true) ?: [];
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
foreach ($users as $user) {
    if ($user['username'] === $username) {
        echo json_encode(['success' => false, 'message' => 'Username already exists!']);
        exit;
    }
}
$users[] = ['username' => $username, 'email' => $email, 'password' => $password];
file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'name' => $username]);