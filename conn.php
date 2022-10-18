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
} elseif ($action == 'edit') {
    $id = $_POST['id'];

    $result = $conn->query('SELECT * FROM `users` WHERE id =' . $id);
    $response['user'] = $result->fetch_assoc();
} elseif ($action == 'update') {
    // print_r($_POST);
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = md5($_POST['password']);
    $result = $conn->query("UPDATE `users` SET `name`='$name',`email`='$email',`password`='$password' WHERE `id` = '$id'");
    if ($result) {
        $response['message'] = 'Data Update Successfully';
    } else {
        $response['error'] = true;
        $response['message'] = 'Data Save Failed';
    }
} elseif ($action == 'delete') {
    $id = $_POST['id'];
    $result = $conn->query("DELETE FROM `users` WHERE `id` = '$id'");
    if ($result) {
        $response['message'] = 'Data Deleted Successfully';
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
