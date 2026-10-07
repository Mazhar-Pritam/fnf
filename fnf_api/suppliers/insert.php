<?php

include '../connection.php';

$data = json_decode(
    file_get_contents('php://input'),
    true
);

$res = [];

if (
    !empty($data['name']) &&
    !empty($data['phone'])
) {

    $supplier_data = [
        'name' => $data['name'],
        'contact_person' => $data['contact_person'] ?? '',
        'phone' => $data['phone'],
        'email' => $data['email'] ?? '',
        'address' => $data['address'] ?? ''
    ];

    $res = $cc->common_insert(
        'suppliers',
        $supplier_data
    );

} else {

    $res = [
        'status' => false,
        'data' => [],
        'message' => 'Supplier name and phone are required'
    ];
}

echo json_encode($res);

?>