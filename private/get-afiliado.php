<?php 
    if (isset($_POST["curp"])){

        error_reporting(0);
        require 'database.php';
        header('Content-type: application/json; charset=utf-8');

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $q = $pdo->prepare('SELECT * FROM afiliados WHERE curp = ?');
        $q->execute(array($_POST["curp"]));
        $data = $q->fetch(PDO::FETCH_ASSOC);
        Database::disconnect();

        $response = array();

        $afiliado = [
            'id' => $data['id_afiliado'],
            'nombre' => $data['nombre'] . " " . $data['app'] . " " . $data['apm'],
            'correo' => $data['correo'],
            'telefono' => $data['telefono'],
            'curp' => $data['curp'],
            'nacimiento' => $data['nacimiento'],
            'edad' => $data['edad'],
            'sexo' => $data['sexo'],
            'disciplina' => $data['disciplina'],
            'motivo' => $data['motivo'],
            'date' => $data['date'],
        ];
        
        $response["afiliado"] = $afiliado;
        $response["success"] = "OK";
        echo json_encode($response);

    } else{
        header ("Location: /dashboard.php");
    }
?>