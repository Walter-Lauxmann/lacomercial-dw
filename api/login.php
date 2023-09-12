<?php
require_once 'modelos.php'; //Requerimos el archivo de clases modelo.php
$mensaje = '';
$valores = $_POST; // Tomamos los valores que vienen del POST en formato JSON
if ($_POST['usuario'] == '' || $_POST['password'] == '') { // Si están vacíos el usuario o el password
    $mensaje .= "El usuario o la contraseña están vacíos<br>";
    echo json_encode($mensaje);
} else {
    $usuario = "'" . $_POST['usuario'] . "'"; //Guardamos en la variable $usuario
    $password = "'" . $_POST['password'] . "'"; //Guardamos en la variable $password

    $usuarios = new ModeloABM('clientes'); // Creamos el objeto usuarios basado en los clientes
    $usuarios->set_criterio("usuario=$usuario AND password=$password"); // Establecemos el criterio
    $datos = $usuarios->seleccionar(); // Seleccionamos los usuarios
    if (count(json_decode($datos)) == 0) { // Si no hay datos
        $mensaje .= "El usuario o la contraseña no coinciden<br>";
        echo json_encode($mensaje);
    } else {
        echo $datos;
    }
}
?>