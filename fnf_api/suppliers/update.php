<?php

include '../connection.php';

$id = $_GET['id'];

$data = json_decode(
    file_get_contents('php://input'),
    true
);

if (
    empty($id) ||
    empty($data['name']) ||
    empty($data['phone'])
) {

    $res = [
        'status' => false,
        'data' => [],
        'message' => 'Supplier ID, name and phone are required'
    ];

} else {

    $supplier_data = [
        'name' => $data['name'],
        'contact_person' => $data['contact_person'] ?? '',
        'phone' => $data['phone'],
        'email' => $data['email'] ?? '',
        'address' => $data['address'] ?? ''
    ];

    $res = $cc->common_update(
        'suppliers',
        $supplier_data,
        ['id' => $id]
    );
}

echo json_encode($res);

?>