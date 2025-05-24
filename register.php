<?php
<?php
$users = json_decode(file_get_contents('users.json'), true) ?: [];
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
foreach ($users as $user) {
    if ($user['username'] === $username) {
        echo "<script>alert('Username already exists!');window.location='register.html';</script>";
        exit;
    }
}
$users[] = ['username' => $username, 'email' => $email, 'password' => $password];
file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
echo "<script>alert('Account created successfully! Please login.');window.location='login.html';</script>";