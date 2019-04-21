<?php

$data = json_decode($_POST['requerimientos']);

var_dump(json_decode($_POST['requerimientos']));
var_dump($data->user);
var_dump($data->concept);
var_dump($data->amount);

var_dump($_FILES);