<?php

if(isset($_POST['myform'])){
    //var_dump(json_decode($_POST['requerimientos']));
    var_dump($_POST);
    var_dump(json_decode($_POST['requerimientos']));

    //var_dump($_POST['myform']);
}else{
    //var_dump($_POST);
    var_dump($_POST);
    var_dump(json_decode($_POST['requerimientos']));
}