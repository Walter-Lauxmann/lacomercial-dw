<?php
require_once 'config.php'; // Requerimos el archivo config.php

/* Definir la clase principal */
class Modelo {
    // Propiedades
    protected $_db;

    // Constructor con la conexión a la BD
    public function __construct() {
        $this->_db = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
        // Si se produce un error de conexión, muestra el error
        if( $this->_db->connect_errno ) {
            echo 'Fallo al conectar a MySQL: '.$this->_db->connect_error;
            return;
        } 
        // Establecemos el conjunto de caracteres a utf8
        $this->_db->set_charset(DB_CHARSET);
        $this->_db->query("SET NAMES 'utf8'");
    }
}
/* Fin de la clase principal */

/* Clase ModeloABM basada en la clase principal */
class ModeloABM extends Modelo {
    // Propiedades
    private $tabla;          // Nombre de la tabla
    private $id = 0;         // Id del registro
    private $criterio = '';  // Criterio para las consultas
    private $campos = '*';   // Lista de campos
    private $orden = 'id';   // Campo de ordenamiento
    private $limit = 0;      // Cantidad de registros

    // Constructor
    public function __construct($t) {
        parent::__construct();   // Ejecutamos el constructor padre
        $this->tabla = $t;       // Asignamos a $tabla el parámetro $t
    }

    /* GETTER */
    public function get_tabla() {
        return $this->tabla;
    }
    public function get_id() {
        return $this->id;
    }
    public function get_criterio() {
        return $this->criterio;
    }
    public function get_campos() {
        return $this->campos;
    }
    public function get_orden() {
        return $this->orden;
    }
    public function get_limit() {
        return $this->limit;
    }

    /* SETTER */
    public function set_tabla($tabla) {
        $this->tabla = $tabla;
    }
    public function set_id($id) {
        $this->id = $id;
    }
    public function set_criterio($criterio) {
        $this->criterio = $criterio;
    }
    public function set_campos($campos) {
        $this->campos = $campos;
    }
    public function set_orden($orden) {
        $this->orden = $orden;
    }
    public function set_limit($limit) {
        $this->limit = $limit;
    }

}
?>