<?php
header('Content-Type: application/json');
include 'databasetre.php';

$level = $_GET['level'];
$result=[];

 if ($level == $graphs['fatturato_by_agent']['access']) {
    $result[] = $graphs['fatturato'];
    $result[] = $graphs['fatturato_by_agent'];
} else if ($level == $graphs['team_efficiency']['access']) {
    $result[] = $graphs['fatturato'];
    $result[] = $graphs['fatturato_by_agent'];
    $result[] = $graphs['team_efficiency'];

}else {
    $result[] = $graphs['fatturato'];
}

echo json_encode($result);
 ?>
