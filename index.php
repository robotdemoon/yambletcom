<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="inputs.css">
        <script src="jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        <script src="quiz.js"></script>
    </head>
    <body>
        <form name="quiz" action="send.php" method="POST" id="logoForm">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-lg-6 m-auto">
                    <div class="ymb-quiz position-relative">
                        <a href="#" class="btn btn-light ymb-button-back ymb-main-components" id="back" data-action="back" style="z-index: 2" hidden><i class="fas fa-long-arrow-alt-left"></i></a>
                        <div id="container"></div>
                        <div class="row mt-4 ymb-width-full">
                            <div class="col-xs-12 col-lg-12 text-center">
                                <input type="button" class="btn btn-primary btn-xs next m-auto ymb-main-components" value="Siguiente" id="next" data-action="next" hidden>
                            </div>
                            <div class="col-xs-12 col-lg-12 mt-4 ymb-main-components" id="progress-bar-container" hidden>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 0%" id="formulario-progress-bar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<input type="submit" class="btn btn-primary">-->
        </form>
        
        <!--<div class="container">
            <form name="quiz" action="send.php" method="POST">
                <div class="container" id="container">

                </div>
                <!--<div class="row">
                    <div class="col-xs-12 col-lg-4">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="1" name="field[]">
                            <label class="form-check-label" for="#">1</label>
                        </div>
                        <div class="form-check form-check-inline clickme">
                            <input class="form-check-input" type="checkbox" value="2" name="flda">
                            <label class="form-check-label" for="#">2</label>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <input type="submit" class="btn btn-primary">
                    </div>
                </div>--
            </form>
        </div>-->
    </body>
</html>