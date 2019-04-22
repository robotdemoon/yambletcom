<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Formulario Logo</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="./assets/css/style.css">
        <link rel="stylesheet" href="./assets/css/inputs.css">
        <script src="./assets/js/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        <script src="./assets/js/quiz.js"></script>
    </head>
    <body>
        <form name="quiz" id="logoForm" class="loadForm" data-file="logo">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-md-9  col-xl-6 m-auto mt-4 mb-4 pb-4 pt-2">
                        <div class="row">
                            <div class="col-12 ymb-main-components" id="progress-bar-container">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 0%" id="formulario-progress-bar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>    
                            </div>
                            <div class="col-12">
                                <a href="#" class="btn btn-light mt-1 ymb-main-components" id="back" data-action="back"><i class="fas fa-long-arrow-alt-left"></i></a>
                            </div>
                            <div class="col-12 mb-4">
                                <div id="container"></div>
                            </div>
                            <div class="col-11 col-md-12 m-auto">
                                <input type="button" class="btn btn-primary btn-sm btn-block next ymb-main-components p-1" value="Siguiente" id="next" data-action="next" disabled hidden>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </body>
</html>