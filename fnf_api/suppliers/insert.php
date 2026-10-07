<?php

include '../connection.php';

$data = json_decode(
    file_get_contents('php://input'),
    true
);

if (
    empty($data['name']) ||
    empty($data['phone'])
) {

    $res = [
        'status' => false,
        'data' => [],
        'message' => 'Supplier name and phone are required'
    ];

} else {

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
}

echo json_encode($res);

?>