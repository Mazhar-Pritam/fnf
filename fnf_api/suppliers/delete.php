<?php

include '../connection.php';

$id = $_GET['id'];

if (empty($id)) {

    $res = [
        'status' => false,
        'data' => [],
        'message' => 'Supplier ID is required'
    ];
} else {
 $res = $cc->common_delete(
        'suppliers',
        ['id' => $id]
    );
}
echo json_encode($res);
?>