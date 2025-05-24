<?php
// filepath: c:\Users\zyadm\Downloads\portfolio_project\login_google.php
// أو register_google.php

// 1. استقبل التوكن من الـ frontend
$data = json_decode(file_get_contents('php://input'), true);
$id_token = $data['id_token'] ?? '';

if (!$id_token) {
    echo json_encode(['success' => false, 'message' => 'No token provided']);
    exit;
}

// 2. تحقق من التوكن مع جوجل
$client_id = "436010504275-8ac6ms5120rg25k1v9741ejgib17s61l.apps.googleusercontent.com";
$google_api = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $id_token;
$resp = json_decode(file_get_contents($google_api), true);

if (!$resp || !isset($resp['email']) || $resp['aud'] !== $client_id) {
    echo json_encode(['success' => false, 'message' => 'Invalid Google token']);
    exit;
}

// 3. بيانات المستخدم من جوجل
$name = $resp['name'];
$email = $resp['email'];
$picture = $resp['picture'] ?? "";

// 4. أضف المستخدم إذا لم يكن موجودًا
$users_file = 'users.json';
$users = file_exists($users_file) ? json_decode(file_get_contents($users_file), true) : [];
$found = false;
foreach ($users as $user) {
    if ($user['email'] === $email) {
        $found = true;
        break;
    }
}
if (!$found) {
    $users[] = [
        'username' => $name,
        'email' => $email,
        'password' => '', // لا يوجد باسورد لجوجل
        'picture' => $picture
    ];
    file_put_contents($users_file, json_encode($users, JSON_PRETTY_PRINT));
}

// 5. رجع بيانات المستخدم للفرونت
echo json_encode([
    'success' => true,
    'name' => $name,
    'picture' => $picture
]);