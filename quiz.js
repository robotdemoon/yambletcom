

$(() => {
    var formulario;
    var position = 0;
    var current = 1;
    var container = $('#container');

    $.getJSON("./logo.json", function(form) {
        formulario = form;
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
        r +=  '<h4 class="text-center mb-3 ymb-mainTitle pb-2">'+q.name+'</h4>';
        switch (q.type) {
            case 'select':
                var next = (q.next == undefined) ? true : false;
                for (const k in q.options) {
                    o += '<option value="' + q.options[k].id + '">' + q.options[k].value+'</option>' 
                }
                r += '<div class="form-group">'
                +'<label>'+ q.name +'</label>'
                +'<select class="form-control" data-next="'+next+'">'
                + o
                +'</select>'
                +'</div>';
                next = false;
                break;
            case 'slide':
                var next = (q.next == undefined) ? true : false;
                r += '<label>'+ q.name +'</label>'
                + '<input type="range" name="'+q.nameForm+'" class="custom-range" min="'+ q.init +'" max="'+q.end+'" data-next="'+next+'">';
                break;
            case 'slide-multi':
                var next = (q.next == undefined) ? true : false;
                for(const k in q.fields){
                    r +='<label>'+ q.fields[k].name +'</label>'
                    + '<input type="range" class="custom-range" min="'+ q.fields[k].init +'" max="'+q.fields[k].end+'" data-next="'+next+'">';
                }
                break;
            case 'radio':
                for(const k in q.options){
                    var next = (q.next == undefined) ? true : false;
                    var img = (q.options[k].img != undefined) ? '<img src="'+ (q.options[k].img) +'" class="ymb-img">' : '';
                    r += '<div class="row"><div class="col m-2 text-center"><div class="form-check form-check-inline">'
                    +'<input class="form-check-input" type="radio" name="' + q.nameForm + '" value="'+ q.options[k].id +'" data-next="'+next+'">'
                    + img
                    +'<label class="form-check-label">'+q.options[k].value+'</label>'
                    +'</div></div></div>';
                }
                break;
            case 'checkbox-multi':
                for(const k in q.options){
                    var next = (q.next == undefined) ? true : false;
                    var img = (q.options[k].img != undefined) ? '<img src="'+ (q.options[k].img) +'" class="ymb-img m-4 p-4">' : '';
                    o += '<div class="col-12 col-lg-6"><div class="form-check form-check-inline d-flex flex-column">'
                    + img
                    +'<input class="form-check-input" type="checkbox" name="' + q.nameForm + '[]" value="'+ q.options[k].id +'" data-next="'+next+'">'
                    +'<label class="form-check-label h4">'+q.options[k].value+'</label>'
                    +'</div></div>';
                }
                r += '<div class="row">'+o+'</div>';
                break;
            default:
                break;
        }
        return {r: r, next: next};
    }
    
    $('body').on('click','#next', function(){
        position = position + 1;
        setQuestion();
        console.log('hola');
        //console.log(document.forms.quiz.field);
        //console.log(formulario, position, current);
    });
})

