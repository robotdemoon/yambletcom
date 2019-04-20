

$(() => {
    var formulario;
    var position = 0;
    var total = 0;
    var container = $('#container');
    var jsontoSave = [];
    var nameJson = ($('.loadForm').attr('data-file') == undefined) ? 'general': $('.loadForm').attr('data-file');
    var generalPay = 1000;
    var totalTopay = 1000; //Valor del Item a pagar
    var conceptGeneral = "Venta de Logo";

    //Buscamos si exite un archivo de carga
    $.getJSON('./' + nameJson + '.json', function(form) {
        formulario = form.formulario;
        generateForm();
    });

    function generateForm(){
        var currentForm = '';
        for (const k in formulario) {
            currentForm += getQuestion(k).r;
        }
        container.empty().append(currentForm);
        total = $('#container > div').length;
        showHide();
    }

    function showHide(action = 'next'){
        $('#container > div').slideUp(((position == 0) ? 0 : 750));
        if(action == 'next'){
            position++;
            position = (position  >= total) ? total: position;
            nextBehavior(formulario[position - 1].next, formulario[position - 1].isOptional);
        }else if(action == 'back'){
            position--;
            position = (position < 1) ? 1 : position;
        }else{
            position = 0;
        }
        
        var width = (position == total) ? 100 : ( ((position - 1 ) / (formulario.length)) * 100 );
        $("#formulario-progress-bar").css('width', width + '%');
        $('#container > div:nth-child('+ position +')').slideDown(750);
        if(position == total){
           // $('#next').hide();
            $('#next').prop('hidden',true);
            var s = '';
            jsontoSave['amount'] = {question: 'Total a pagar:', value: totalTopay};
            jsontoSave['concept'] = {question: 'Concepto a pagar:', value: conceptGeneral};

            for (const k in jsontoSave) {
                var title = '';
                var ss = ''; 
                if(jsontoSave[k].elements != undefined && jsontoSave[k].elements.length > 0){
                    title = '<h5>'+jsontoSave[k].question +'</h5>';
                    for (const kk in jsontoSave[k].elements) {
                        if(jsontoSave[k].elements[kk].name != undefined && jsontoSave[k].elements[kk].value != undefined){
                            ss += '<p>'+jsontoSave[k].elements[kk].name+':'+jsontoSave[k].elements[kk].value+'</p>'; 
                        }else{
                            ss += '<p>'+jsontoSave[k].elements[kk]+' </p>';  
                        }
                    }
                    s += '<div class="row ymb-resume"><div class="col-12">' + title +ss + '</div></div>';
                }else{
                    title = '<h5>'+jsontoSave[k].question +'</h5>';
                    ss += '<p>'+jsontoSave[k].value+'</p>' 
                    s += '<div class="row ymb-resume"><div class="col-12">' + title + ss + '</div></div>';
                }
            }
            s =' <div class="row"><div class="col-12"><h4 class="ymb-mainTitle text-center pb-3">Resumen</h4></div></div>' +  s;
            //Agregamos el Resumen
            container.append(s);
        }else{
            hasValues();
        }
    }

    function getQuestion(pos){
        var q = formulario[pos];
        var r = '';
        var o = '';
        var next = true;
        r +=  '<h6 class="text-center mb-3 ymb-mainTitle pt-1 pb-2 pr-1 pl-1 font-weight-bolder">'+q.question+'</h6>';
        switch (q.type) {
            case 'select':
                var next = false;
                for (const k in q.options) {
                    o += '<option value="' + q.options[k].value + '">' + q.options[k].value+'</option>' 
                }
                r += '<div clas="row"><div class="col"><div class="form-group">'
                +'<label>'+ ((q.label != undefined) ? q.label : q.name) +'</label>'
                +'<select class="form-control" name="'+q.nameForm+'" data-next="'+next+'" data-title="'+q.name+'">'
                + o
                +'</select>'
                +'</div></div></div>';
                jsontoSave[ q.nameForm] =  {name: q.nameForm, question: q.question, value: q.options[0].id  }
                break;
            case 'slide':
                if(jsontoSave[q.nameForm]  == undefined){
                    jsontoSave[q.nameForm] = {question: q.question, elements: []};
                }
                for(const k in q.fields){
                    r +='<div clas="row"><div class="'+ ((q.fields[k].class != undefined)? q.fields[k].class : '') + '"><label class="d-flex justify-content-between"><span>'+q.fields[k].firstValue+'</span><span>'+q.fields[k].lastValue+'</span></label>'
                    + '<input type="range" name="'+q.nameForm+k+'" data-name-alias="'+q.nameForm+'" class="custom-range" min="'+ q.fields[k].init +'" max="'+q.fields[k].end+'" data-position="'+k+'"></div></div>';
                    jsontoSave[q.nameForm].elements[k] =  {name: q.fields[k].nameForm,  value:  q.fields[k].value}
                }
                break;
            case 'radio':
                for(const k in q.elements){
                    var img = (q.elements[k].img != undefined) ? '<img src="'+ (q.elements[k].img) +'" class="ymb-img mb-2">' : '';
                    o += '<div class="' + ((q.elements[k].class != undefined)? q.elements[k].class : '') + '">'
                    +'<div class="inputGroup">'
                    +'<input type="radio" class="'+ ((q.elements[k].action != undefined) ? q.elements[k].action : '')+'" name="' + q.nameForm + '" id="'+ q.nameForm + k +'" value="'+ q.elements[k].value +'" '+ ((q.elements[k].amount != undefined) ? 'data-amount='+ q.elements[k].amount : '') +'>'
                    + img
                    +'<label for="'+ q.nameForm + k +'" >'+q.elements[k].value + ((q.amount !=undefined) ? ' +$'+q.elements[k].amount:'') + '</label>'
                    +'</div></div>';
                }
                r = r + '<div class="row">'+o+'</div>';
                jsontoSave[ q.nameForm ] =  {name: q.nameForm, question: q.question, value: undefined}
                break;
            case 'checkbox':
                if(jsontoSave[q.nameForm]  == undefined){
                    jsontoSave[q.nameForm] = {question: q.question, elements: []};
                }
                //No debe tener un valor por defecto
                for(const k in q.options){
                    var next = true;
                    var img = (q.options[k].img != undefined) ? '<img src="'+ (q.options[k].img) +'" class="ymb-img mb-2">' : '';
                    o += '<div class=" '+((q.options[k].class != undefined) ? q.options[k].class: ' m-2 ')+' text-center"><div class="form-check form-check-inline d-flex flex-column inputGroup">'
                    + img
                    +'<input type="checkbox" id="'+ q.nameForm + q.options[k].id +'" name="' + q.nameForm + '[]" value="'+ q.options[k].value +'" data-position="'+k+'">'
                    +'<label for="'+ q.nameForm + q.options[k].id +'">'+q.options[k].value+'</label>'
                    +'</div></div>';
                }
                r += '<div class="row">'+ o + '</div>';
                break;
            case 'text':
                o += '<div class="row"><div class="col-11 m-auto"><div class="form-group">'
                + '<label>'+ ((q.label != undefined) ? q.label : q.name) +'</label>'
                + '<input type="text" class="form-control" name="'+q.nameForm+'"></input>'
                +'</div></div></div>';
                jsontoSave[ q.nameForm ] =  {name: q.nameForm, question: q.question, value:  ''}
                r = r + o;
                break;
            case 'files':
                for (let i = 0; i < q.total; i++) {
                    r +='<div class="row"><div class="col-11 m-auto"><div class="input-group mb-3">'
                    +'<div class="custom-file">'
                    +'<input type="file" class="custom-file-input" name="'+q.nameForm+i+'" data-title="'+q.name+'">'
                    +'<label class="custom-file-label">'+((q.label != undefined) ? q.label : q.name)+'</label>'
                    +'</div></div></div></div>';
                }
                break;
            case 'only-button':
                r = '<div class="row ymb-minHeight"><div class="col d-flex align-items-center justify-content-center"><'+((q.action) ? 'button ': 'a ')+((q.action && q.typeBtn != undefined) ? 'type="'+q.typeBtn+'"': '')+'class="btn btn-success text-light btn-lg pl-5 pr-5 btnInit '+((q.action != undefined && q.typeBtn == 'submit') ? q.action: '')+'">'+ q.name + '</'+ ((q.action) ? 'button': 'a')+'></div></div>';
                break;
            case 'text-multi':
                var o = '';
                if(jsontoSave[q.nameForm]  == undefined){
                    jsontoSave[q.nameForm] = {question: q.question, elements: []};
                }
                for (const k in q.fields) {
                    o += '<div class="row"><div class="'+((q.fields[k].class != undefined) ? q.fields[k].class: ' ')+'"><div class="form-group">'
                    + '<label>'+ q.fields[k].label +'</label>'
                    + '<input type="'+q.fields[k].type+'" class="form-control" name="'+q.fields[k].nameForm+'" data-name-alias="'+q.nameForm+'" data-position="'+k+'"></input>'
                    +'</div></div></div>';
                    jsontoSave[q.nameForm].elements[k] =  {name: q.fields[k].nameForm, value: undefined}
                }
                r = r + o;
                break;
            default:
                break;
        }
        r = '<div class="row"><div class="' + ((q.class != undefined) ? q.class: ' col ') + ' valid-value">'+ r +'</div></div>'
        return {r: r, next: next};
    }
    
    $('body').on('click','#next, #back', function(){
        var action = $(this).attr('data-action');
        showHide(action);
    });

    $('body').on('change', '.valid-value  input, .valid-value  select', function(){
        var pos = position - 1;
        var currentField = formulario[pos];
        var isMulti = currentField.isMulti;
        var next = currentField.next;
        var response;
        var val = $(this).val();
        var nameField = (($(this).attr('data-name-alias') != undefined) ? $(this).attr('data-name-alias') : $(this).attr('name'));
        var validations = {required: false, minlength: 6, maxlength: 60};
        var optional = (currentField.isOptional != undefined) ? currentField.isOptional : false;
        nextBehavior(next, optional);
        if(!isMulti){
            if(currentField.type == "checkbox"){
                if(!$(this).prop('checked')){
                    jsontoSave[currentField.nameForm].elements = jsontoSave[currentField.nameForm].elements.filter( x => x !== val);
                }else{
                    jsontoSave[ currentField.nameForm ].elements.push(val);
                }
                //Revisamos que tenga valores
                nextBehavior(true, (((jsontoSave[ currentField.nameForm ].elements.length > 0) ? true : false)));
            }else{
                response = {name: currentField.nameForm, question: currentField.question, value: val};
                jsontoSave[nameField] = response;
                if(validateField(((currentField.validations != undefined) ? currentField.validations : validations), val)){
                    if(currentField.type == "radio" || currentField.type == "select"){
                        nextBehavior(next, optional, true);
                    }else{
                        nextBehavior(next, true);
                    }
                }
            }
            
        }else{
            currentPosition = $(this).attr('data-position');
            response = {name: currentField.fields[currentPosition].nameForm, value: val};
            jsontoSave[nameField].elements[currentPosition] = response; 
            let statusMulti = true;
            for (const k in jsontoSave[nameField].elements) {
                if(jsontoSave[nameField].elements[k].value == undefined){
                    statusMulti = false;
                }else if(currentField.fields[k].validations != undefined && validateField(currentField.fields[k].validations, val) == false){
                    statusMulti = false;
                }
            }
            if(statusMulti)
                nextBehavior(true, statusMulti);
        }
    })


    function validateField(validations, value){
        state = true;
        if(validations.required){
            if(value.length < validations.minlength){  state = false;}
            if(value.length > validations.maxlength){  state = false;}
            if(value == ""){  state = false;}
        }
        return state;
    }

    function nextBehavior(next = true, isOptional = false, nextContainer = false){
        var n = $("#next");
        n.prop('hidden', ((!next) ? true: false)).prop('disabled', ((!isOptional) ? true : false));
            
        if(nextContainer){
            showHide('next');
        }
    }

    function hasValues(){
        var pos = position - 1;
        var currentField = formulario[pos];
        var isMulti = currentField.isMulti;
        var validations = {required: false, minlength: 6, maxlength: 60};
        var objeto = jsontoSave[currentField.nameForm]
        if(!isMulti){
            if(currentField.type == "checkbox"){
                nextBehavior(true, (((jsontoSave[ currentField.nameForm ].elements.length > 0) ? true : false)));
            }else{
                if(validateField(((currentField.validations != undefined) ? currentField.validations : validations), objeto.value)){
                    nextBehavior(true, true);
                }
            }
            
        }else{
            let statusMulti = true;
            if(currentField.type != "files"){
                for (const k in objeto.elements) {
                    if(objeto.elements[k].value == undefined){
                        statusMulti = false;
                    }
                }
                if(statusMulti){
                    nextBehavior(true, statusMulti);
                }
            }
        }
    }

    /**
     * [Metodos Adicionales]
     */

    $("body").on("click", ".topay", function(){
        tp = (totalTopay * 1 ) + ($(this).attr('data-amount') * 1);
        totalTopay = tp;
    });

    $("body").on("click", ".restTotal", function(){
        tp =  (totalTopay * 1 ) - ($(this).attr('data-amount') * 1);
        totalTopay = (tp < generalPay)? generalPay : tp;
    });

    $( "body" ).on( "click", ".sendForm" ,function() {
        console.log('sending');
        event.preventDefault();

        data = $('#logoForm').serializeArray();
        jsonSend = JSON.stringify(jsontoSave);
        data.push({name: 'requerimientos', value: jsonSend});
        data.push({name: 'amount', value: totalTopay});
        data.push({name: 'concept', value: conceptGeneral});
        $.ajax({
            type: "POST",
            url: "http://165.22.133.122/public/index.php/api/choosePaymentMethod",
            data: data,
            success: function(msg){
              console.log(msg);
            }
         });
    })


    $( "body" ).on( "submit", "#logoForm" ,function( event ) {
        event.preventDefault();
    });
})