<?php
require_once 'modelos.php'; // Requerimos el archivo de clases modelo.php

if (isset($_GET['tabla'])) { // Si está seteado el atributo tabla
    $t = $_GET['tabla'];

    $tabla = new ModeloABM($t); // Creamos el objeto $tabla

    if(isset($_GET['accion'])) { // Si está seteado el atributo accion
        switch($_GET['accion']) {               // Según la accion
            case 'seleccionar':                     // En caso que sea 'seleccionar'
               $datos = $tabla->seleccionar();      // Ejecutamos el método seleccionar()
                echo $datos;                        // Devolvemos los datos
                break;
            case 'insertar':                        // En caso que sea 'insertar'
                $valores = $_POST;
                $tabla->insertar($valores);         // Ejecutamos el método insertar()
                break;
        }
    }    
}
