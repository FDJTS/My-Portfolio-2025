<?php
header('Content-Type: application/json');
$file = 'comments.json';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $comments = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    $comments[] = [
        'name' => htmlspecialchars($data['name']),
        'text' => htmlspecialchars($data['text']),
        'date' => date('c')
    ];
    file_put_contents($file, json_encode($comments, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
    exit;
}
echo file_exists($file) ? file_get_contents($file) : '[]';