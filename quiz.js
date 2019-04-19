

$(() => {
    var formulario;
    var position = 0;
    var current = 1;
    var container = $('#container');

    $.getJSON("./logo.json", function(form) {
        formulario = form;
        console.log(formulario.formulario.length);
        setQuestion();
        //console.log(formulario.formulario[position].type);
    });

    function setQuestion(){
        var response = getQuestion();
        $('#container').empty().append(response.r);
    }

    function getQuestion(){
        var q = formulario.formulario[position];
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
                +'<select class="form-control" data-next="'+next+'">'
                + o
                +'</select>'
                +'</div></div></div>';
                next = false;
                break;
            case 'slide':
                var next = (q.next == undefined) ? true : false;
                r += '<div clas="row"><div class="col-10 m-auto"><label>'+ q.name +'</label>'
                + '<input type="range" name="'+q.nameForm+'" class="custom-range" min="'+ q.init +'" max="'+q.end+'" data-next="'+next+'"></div></div>';
                break;
            case 'slide-multi':
                var next = (q.next == undefined) ? true : false;
                for(const k in q.fields){
                    r +='<div clas="row"><div class="col-10 m-auto"><label>'+ q.fields[k].name +'</label>'
                    + '<input type="range" class="custom-range" min="'+ q.fields[k].init +'" max="'+q.fields[k].end+'" data-next="'+next+'"></div></div>';
                }
                break;
            case 'radio':
                for(const k in q.options){
                    var next = (q.next == undefined) ? true : false;
                    var img = (q.options[k].img != undefined) ? '<img src="'+ (q.options[k].img) +'" class="ymb-img">' : '';
                    r += '<div class="row"><div class="col m-2 text-center"><div class="inputGroup">'
                    +'<input type="radio" name="' + q.nameForm + '" id="'+ q.nameForm + q.options[k].id +'" value="'+ q.options[k].id +'" data-next="'+next+'">'
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
                    +'<input type="checkbox" id="'+ q.nameForm + q.options[k].id +'" name="' + q.nameForm + '[]" value="'+ q.options[k].id +'" data-next="'+next+'">'
                    +'<label for="'+ q.nameForm + q.options[k].id +'">'+q.options[k].value+'</label>'
                    +'</div></div>';
                }
                r += '<div class="row">'+o+'</div>';
                break;
            case 'text':
                var next = (q.next == undefined) ? true : false;
                r += '<div class="col-11 m-auto"><div class="form-group">'
                + '<label for="exampleInputEmail1">'+ q.name +'</label>'
                + '<input type="text" class="form-control" name="'+q.nameForm+'" data-next="'+next+'"></input>'
                +'</div></div></div>';
                break;
            case 'files':
                for (let i = 0; i < q.total; i++) {
                    r +='<div class="row"><div class="col-11 m-auto"><div class="input-group mb-3">'
                    +'<div class="input-group-prepend">'
                    +'<span class="input-group-text">Subir</span></div>'
                    +'<div class="custom-file">'
                    +'<input type="file" class="custom-file-input" name="'+q.nameForm+i+'">'
                    +'<label class="custom-file-label">'+q.name+'</label>'
                    +'</div></div></div></div>';
                }
                break;
            default:
                break;
        }
        return {r: r, next: next};
    }
    
    $('body').on('click','#next', function(){
        position = position + 1;
        setQuestion();
        var width = (position / formulario.formulario.length ) * 100;
        console.log(width);
        $("#formulario-progress-bar").css('width', width + '%')
        console.log('hola');
        //console.log(document.forms.quiz.field);
        //console.log(formulario, position, current);
    });
})

