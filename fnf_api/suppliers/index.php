<?php

include '../connection.php';

$result = $cc->common_select(
    'suppliers',
    '*',
    [],
    'AND',
    'id',
    'DESC'
);

echo json_encode($result);

?>