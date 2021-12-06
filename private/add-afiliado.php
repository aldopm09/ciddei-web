<?php 
    if (isset($_POST["nombre"]) && isset($_POST["app"]) && isset($_POST["apm"]) && isset($_POST["curp"]) && 
        isset($_POST["nacimiento"]) && isset($_POST["edad"]) && isset($_POST["sexo"]) && isset($_POST["telefono"]) &&
        isset($_POST["correo"]) && isset($_POST["disciplina"]) && isset($_POST["motivo"]) && isset($_FILES["imagen"])){

        error_reporting(0);
        $response = array();
        $archivo = $_FILES["imagen"];
        $dir_subida = $_SERVER["DOCUMENT_ROOT"] . '/images/afiliados/';
        $fichero_subido = $dir_subida . basename($_POST['curp'].'.jpg');

        if (move_uploaded_file($archivo['tmp_name'], $fichero_subido)){
            require 'database.php';
            header('Content-type: application/json; charset=utf-8');

            $pdo = Database::connect();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $q = $pdo->prepare('INSERT INTO afiliados(nombre,app,apm,curp,nacimiento,edad,sexo,telefono,correo,disciplina,motivo) VALUES(?,?,?,?,?,?,?,?,?,?,?)');
            $q->execute(array($_POST["nombre"],$_POST["app"],$_POST["apm"],$_POST["curp"],$_POST["nacimiento"],$_POST["edad"],$_POST["sexo"],$_POST["telefono"],$_POST["correo"],$_POST["disciplina"],$_POST["motivo"]));
            Database::disconnect();
            
            if($q){
                $response["success"] = "OK";
            } else{
                $response["error"] = "No es posible conectar con la base de datos intentelo mas tarde";
            }
            
            echo json_encode($response);
        }else{
            $response["error"] = "No es posible conectar con la base de datos intentelo mas tarde";
            echo json_encode($response);
        }        

    } else{
        header ("Location: /");
    }
?>