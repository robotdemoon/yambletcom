

$(() => {
    var formulario;
    var position = 0;
    var total = 0;
    var container = $('#container');
    var jsontoSave = [];

    $.getJSON("./logo.json", function(form) {
        formulario = form.formulario;
        generateForm();
    });

    /*function setQuestion(){
        var response = getQuestion();
        container.empty().append(response.r);
    }*/

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
        $('#container > div').hide();
        if(action == 'next'){
            position++;
            position = (position  >= total) ? total: position;
        }else if(action == 'back'){
            position--;
            position = (position < 2) ? 2 : position;
        }else{
            position = 0;
        }
        var width = ((position - 2) / (formulario.length - 1)) * 100;
        $("#formulario-progress-bar").css('width', width + '%');
        console.log(position);
        $('#container > div:nth-child('+ position +')').show();

        if(position == total){
            //document.forms.quiz.submit();
        }
    }

    function getQuestion(pos){
        var q = formulario[pos];
        var r = '';
        var o = '';
        var next = true;
        r +=  '<h4 class="text-center mb-3 ymb-mainTitle pb-2 pr-5 pl-5">'+q.name+'</h4>';
        switch (q.type) {
            case 'select':
                var next = (q.next == undefined) ? true : false;
                for (const k in q.options) {
                    o += '<option value="' + q.options[k].id + '">' + q.options[k].value+'</option>' 
                }
                r += '<div clas="row"><div class="col-10 m-auto"><div class="form-group">'
                +'<label>'+ q.name +'</label>'
                +'<select class="form-control" name="'+q.nameForm+'" data-next="'+next+'" data-title="'+q.name+'">'
                + o
                +'</select>'
                +'</div></div></div>';
                next = false;
                break;
            case 'slide':
                var next = (q.next == undefined) ? true : false;
                r += '<div clas="row"><div class="col-10 m-auto"><label>'+ q.name +'</label>'
                + '<input type="range" name="'+q.nameForm+'" class="custom-range" min="'+ q.init +'" max="'+q.end+'" data-next="'+next+'" data-title="'+q.name+'"></div></div>';
                break;
            case 'slide-multi':
                var next = (q.next == undefined) ? true : false;
                for(const k in q.fields){
                    r +='<div clas="row"><div class="col-10 m-auto"><label>'+ q.fields[k].name +'</label>'
                    + '<input type="range" name="'+q.fields[k].name+'" class="custom-range" min="'+ q.fields[k].init +'" max="'+q.fields[k].end+'" data-next="'+next+'" data-title-multi="'+q.fields[k].name+'" data-position="'+k+'"></div></div>';
                }
                break;
            case 'radio':
                for(const k in q.options){
                    var next = (q.next == undefined) ? true : false;
                    var img = (q.options[k].img != undefined) ? '<img src="'+ (q.options[k].img) +'" class="ymb-img">' : '';
                    r += '<div class="row"><div class="col m-2 text-center"><div class="inputGroup">'
                    +'<input type="radio" name="' + q.nameForm + '" id="'+ q.nameForm + q.options[k].id +'" value="'+ q.options[k].value +'" data-title="'+q.name+'" data-next="'+next+'">'
                    + img
                    +'<label for="'+ q.nameForm + q.options[k].id +'" >'+q.options[k].value+'</label>'
                    +'</div></div></div>';
                }
                break;
            case 'checkbox-multi':
                for(const k in q.options){
                    var next = (q.next == undefined) ? true : false;
                    var img = (q.options[k].img != undefined) ? '<img src="'+ (q.options[k].img) +'" class="ymb-img m-4 p-4">' : '';
                    o += '<div class="col-11 col-lg-5 m-auto"><div class="form-check form-check-inline d-flex flex-column inputGroup">'
                    + img
                    +'<input type="checkbox" id="'+ q.nameForm + q.options[k].id +'" name="' + q.nameForm + '[]" value="'+ q.options[k].id +'" data-next="'+next+'" data-title-multi="'+q.name+'" data-position='+k+' data-type="checkbox-multi">'
                    +'<label for="'+ q.nameForm + q.options[k].id +'">'+q.options[k].value+'</label>'
                    +'</div></div>';
                }
                r += '<div class="row">'+o+'</div>';
                break;
            case 'text':
                var next = (q.next == undefined) ? true : false;
                r += '<div class="row"><div class="col-11 m-auto"><div class="form-group">'
                + '<label for="exampleInputEmail1">'+ q.name +'</label>'
                + '<input type="text" class="form-control" name="'+q.nameForm+'" data-next="'+next+'" data-title="'+q.name+'"></input>'
                +'</div></div></div></div>';
                break;
            case 'files':
                for (let i = 0; i < q.total; i++) {
                    r +='<div class="row"><div class="col-11 m-auto"><div class="input-group mb-3">'
                    +'<div class="input-group-prepend">'
                    +'<span class="input-group-text">Subir</span></div>'
                    +'<div class="custom-file">'
                    +'<input type="file" class="custom-file-input" name="'+q.nameForm+i+'" data-title="'+q.name+'">'
                    +'<label class="custom-file-label">'+q.name+'</label>'
                    +'</div></div></div></div>';
                }
                break;
            case 'only-button':
                r = '<div class="row ymb-minHeight"><div class="col d-flex align-items-center justify-content-center"><'+((q.action) ? 'button': 'a')+' class="btn btn-success text-light btn-lg pl-5 pr-5" id="btnInit">'+ q.name + '</'+ ((q.action) ? 'button': 'a')+'></div></div>';
                break;
            case 'text-multi':
                var next = (q.next == undefined) ? true : false;
                var o = '';
                for (const k in q.fields) {
                    o += '<div class="row"><div class="col-11 m-auto"><div class="form-group">'
                    + '<label>'+ q.fields[k].label +'</label>'
                    + '<input type="'+q.fields[k].type+'" class="form-control" name="'+q.fields[k].nameForm+'" data-next="'+next+'" data-title="'+q.name+'"></input>'
                    +'</div></div></div>';
                }
                r = r + o;//+ r;
                break;
            default:
                break;
        }
        r = '<div class="row"><div class="col valid-value">'+ r +'</div></div>'
        return {r: r, next: next};
    }
    
    $('body').on('click','#next, #back', function(){
        var action = $(this).data('action');
        if(action == 'next'){
            showHide();
        }else{
            showHide('back');
        }
        console.log($(this).data('action'));
        
    });

    $('body').on('click','#btnInit', function(){
        showHide(action = 'next');
        $('.ymb-main-components').removeAttr('hidden');
    })


    /*$('body').on('click', '.valid-value  input, .valid-value  select', function(){
        console.log($(this).val());
    })*/

    $('body').on('change', '.valid-value  input, .valid-value  select', function(){
        if($(this).attr("data-title-multi") == undefined){
            var data = {name: $(this).attr("name"), question: $(this).attr("data-title"), answer: $(this).val() }
            jsontoSave[position] = data;
        }else{
            var data = {name: $(this).attr("name"), question: $(this).attr("data-title-multi"), answer: $(this).val() }
            if(jsontoSave[position] == undefined){
                jsontoSave[position] = [];
            }

            jsontoSave[position][$(this).attr('data-position')] = data;
            if($(this).attr("data-type") != undefined && $(this).attr("data-type") == 'checkbox-multi'){
                if(!$(this).prop('checked')){
                    jsontoSave[position] = jsontoSave[position].filter(x  => x !== data);
                    //jsontoSave[position][$(this).attr('data-position')]
                    //jsontoSave[position].splice($(this).attr('data-position'), 1);
                    //jsontoSave[position][$(this).attr('data-position')] = {};
                }
            }
            
        }
        console.log(jsontoSave);
        //console.log($(this).val(), $(this).attr("name"), $(this).attr("data-title"));
    })

    $('body').on('keypress', '.valid-value  input', function(){
        if($(this).attr("data-title-multi") == undefined){
            var data = {name: $(this).attr("name"), question: $(this).attr("data-title"), answer: $(this).val() }
            jsontoSave[position] = data;
        }else{
            var data = {name: $(this).attr("name"), question: $(this).attr("data-title-multi"), answer: $(this).val() }
            if(jsontoSave[position] == undefined){
                jsontoSave[position] = [];
            }
            
            jsontoSave[position][$(this).attr('data-position')] = data;

            if($(this).attr("data-type") != undefined && $(this).attr("data-type") == 'checkbox-multi'){
                if(!$(this).prop('checked')){
                    jsontoSave[position] = jsontoSave[position].filter( x => x !== data);
                    //jsontoSave[position][$(this).attr('data-position')]
                    //jsontoSave[position][$(this).attr('data-position')] = {};
                    //jsontoSave[position].splice($(this).attr('data-position') - 1, 1);
                }
            }
        }
        
        console.log(jsontoSave);
        //console.log($(this).val(), $(this).attr("name"), $(this).attr("data-title"));
    })

    $( "body" ).on( "submit", "#logoForm" ,function( event ) {
        event.preventDefault();
        console.log( $( this ) );
    });
})
