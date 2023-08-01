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


    /** 
     * Método de Selección de datos 
     */
    public function seleccionar() {
        // SELECT * FROM articulos WHERE criterio ORDER BY campo LIMIT 10
        $sql = "SELECT $this->campos FROM $this->tabla"; // SELECCIONAR $campos DESDE $tabla
        // Si el $criterio NO es igual a NADA
        if($this->criterio != '') {
           $sql .= " WHERE $this->criterio"; // DONDE $criterio 
        }
        // Agregamos el orden
        $sql .= " ORDER BY $this->orden"; // ORDENADO POR $orden
        // Si $limit es mayor que cero
        if($this->limit > 0) {
            // Agregamos el límite
            $sql .= " LIMIT $this->limit"; 
        }
        // echo $sql.'<br>'; // Mostramos la instrucción SQL resultante

        // Ejecutamos la consulta y la guardamos en $resultado
        $resultado = $this->_db->query($sql);

        // Guardamos los datos en un array asociativo
        $datos = $resultado->fetch_all(MYSQLI_ASSOC);
        // print_r($datos);

        // Convertimos los datos al formato JSON
        $datos_json = json_encode($datos);
        // print_r($datos_json);

        // Retornamos los datos JSON
        return $datos_json;
    }

    /**
     * Método de Inserción datos
     * @param valores los valores a insertar
     */
    public function insertar($valores) {
        // INSERT INTO articulos(codigo, nombre, descripcion, precio, imagen)
        // VALUES ('201', 'Samsung Galaxy S20', 'Procesador: xxx, Almacenamiento: xxx', '890000', 'samsung-galaxy-s20.jpg')
        $campos = ''; // Variable para almacenar los campos
        $datos = '';  // Variable para almacenar los datos

        // Recorrer el objeto $valores
        foreach($valores as $key=>$value) {
            $value = "'".$value."'"; // Agregamos apóstrofe (') antes y después de cada value
            $campos .= $key.","; // Agregamos en $campos, la $key más una coma
            $datos .= $value.","; // Agregamos en $datos, los $value más una coma
        }
        $campos = substr($campos,0,strlen($campos)-1); // Quitamos el último caracter (,) a $campos
        $datos = substr($datos,0,strlen($datos)-1); // Quitamos el último caracter (,) a $datos

        // Instrucción SQL
        $sql = "INSERT INTO $this->tabla($campos) VALUES($datos)";
        echo $sql; // Mostramos la instrucción SQL resultante
        $this->_db->query($sql); // Ejecutamos la instrucción SQL
    }
    

}
