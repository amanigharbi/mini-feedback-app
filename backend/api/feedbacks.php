<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$file = __DIR__ . '/../data/feedbacks.json';

if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = file_get_contents($file);
    echo $data;
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['message']) || empty(trim($input['message']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Message is required']);
        exit;
    }
    if (!isset($input['title']) || empty(trim($input['title']))) {
        http_response_code(400);
        echo json_encode(['error' => 'title is required']);
        exit;
    }

    if (!isset($input['category']) || empty(trim($input['category']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Catégorie requise']);
        exit;
    }

    $feedbacks = json_decode(file_get_contents($file), true);
    date_default_timezone_set('Europe/Paris');

    $newFeedback = [
        'id' => uniqid(),
        'title' => htmlspecialchars($input['title']),
        'message' => htmlspecialchars($input['message']),
        'category' => htmlspecialchars($input['category']),
        'date' => date('Y-m-d H:i:s')
    ];

    $feedbacks[] = $newFeedback;

    file_put_contents($file, json_encode($feedbacks, JSON_PRETTY_PRINT));

    echo json_encode($newFeedback);
    exit;
}
