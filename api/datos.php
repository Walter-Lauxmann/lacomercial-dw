<?php
require_once 'modelos.php'; // Requerimos el archivo de clases modelo.php

$mensaje = '';

if (isset($_GET['tabla'])) { // Si está seteado el atributo tabla
    $t = $_GET['tabla'];
    $tabla = new ModeloABM($t); // Creamos el objeto $tabla

    if(isset($_GET['id'])) {   // Si está seteado el atributo id
        $tabla->set_criterio("id=".$_GET['id']); // Establecemos el criterio
    }

    if(isset($_GET['accion'])) { // Si está seteado el atributo accion
        switch($_GET['accion']) {               // Según la accion
            case 'seleccionar':                     // En caso que sea 'seleccionar'
               $datos = $tabla->seleccionar();      // Ejecutamos el método seleccionar()
                echo $datos;                        // Devolvemos los datos
                break;
                
            case 'insertar':                        // En caso que sea 'insertar'
                $valores = $_POST;                  // Tomamos los valores del POST
                $tabla->insertar($valores);         // Ejecutamos el método insertar()
                $mensaje .= 'Datos guardados';      // Creamos un mensaje
                echo json_encode($mensaje);         // Mostramos el mensaje
                break;

            case 'actualizar':                      // En caso que sea 'actualizar'
                $valores = $_POST;                  // Tomamos los valores del POST
                $tabla->actualizar($valores);       // Ejecutamos el método actualizar()
                $mensaje .= 'Datos actualizados';   // Creamos un mensaje
                echo json_encode($mensaje);         // Mostramos el mensaje
                break;
        }
    }    
}
