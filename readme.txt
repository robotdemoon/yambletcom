//Para Configurar la url de el endpoint para enviar el formulario
en configs.json cambiar la variable url

//Para agregar nueva pantalla a un json existente
agregar un nuevo item a ese json del tipo siguiente
{
    "type":"text",
    "nameForm":"nuevoCampo",
    "next": true,
    "isOptional": false,
    "isMultiple": false
}

//asegurarse de seguir los ejemplos del propio json, deben de contener al menos esas variable segun el tipo
//por lo regular se tiene un campo class en el item que se puede cambiar agregando estilos bootstrap al item

// para decirle que formulario se enviara
cuando se cree elhtml colocar en el div una clase con el nombre de "loadForm"
con las propiedades:
id
data-file ---> este es el nombre del json que trae los items donde se construira el formulario


