<?php

$conn = new mysqli('localhost', 'root', '', 'vue-crud');
if ($conn->connect_errno) {
    echo 'Failed to connect database';
    die();
}

$response = [
    'error' => false,
];

$action = null;

if (isset($_GET['action'])) {
    $action = $_GET['action'];
}

if ($action == 'read') {
    $result = $conn->query('SELECT * FROM `users`');
    $data = [];

    while ($row = $result->fetch_assoc()) {
        array_push($data, $row);
    }
    $response['users'] = $data;
} elseif ($action == 'create') {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = md5($_POST['password']);

    $result = $conn->query("INSERT INTO `users` (`name`,`email`,`password`)  VALUES ('$name','$email','$password')");

    if ($result) {
        $response['message'] = 'Data Save Successfully';
    } else {
        $response['error'] = true;
        $response['message'] = 'Data Save Failed';
    }

} else {
    $response = [
        'error' => 'Something wrong',
    ];
}
header('content-type: application/json');
echo json_encode($response);
