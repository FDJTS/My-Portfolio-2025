<?php
<?php
session_start();
$users = json_decode(file_get_contents('users.json'), true) ?: [];
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
foreach ($users as $user) {
    if ($user['username'] === $username && $user['password'] === $password) {
        $_SESSION['user'] = $username;
        header('Location: index.html');
        exit;
    }
}
echo "<script>alert('Invalid credentials!');window.location='login.html';</script>";