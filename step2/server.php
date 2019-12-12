<?php

header('Content-Type: application/json');
include 'databasedue.php';
echo json_encode($graphs);
 ?>
