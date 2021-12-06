<?php
class Database{

    private static $dbName = 'dbs1416901';
    private static $dbHost = 'db5001714239.hosting-data.io';
    private static $dbUsername = 'dbu410728';
    private static $dbUserPassword = '*Afiliacion==2021*';

    /* private static $dbName = 'ciddei';
    private static $dbHost = 'localhost';
    private static $dbUsername = 'root';
    private static $dbUserPassword = ''; */

    private static $conection = null;

    public function __construct() {
        die('Init function is not allowed');
    }

    public static function connect() {
        if (null === self::$conection) {
            try {
                self::$conection =  new PDO('mysql:host='.self::$dbHost.'; dbname='.self::$dbName, self::$dbUsername, self::$dbUserPassword);
            } catch(PDOException $e) {
                die($e->getMessage());
            }
        }
        return self::$conection;
    }

    public static function disconnect() {
        self::$conection = null;
    }
}