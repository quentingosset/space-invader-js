var tirArray;
var soucoupeArray;
var point;
var boss;
var fire;
var started = new Audio('sound/star-wars-theme-song.mp3');
var final = new Audio('sound/imperial_march.mp3');
var missile = new Audio('sound/Missile.mp3');
var explosion = new Audio('sound/explosion.mp3');
          
started.play();
showBestScore();         

function start(){
    soucoupeArray = [];
    tirArray = [];
    point = 0;
    boss = false;
    fire = true;
    $('#scoring').html('<div><img src="images/HUD/HealthBar.png" style="position: absolute;z-index: 1;"><img id="life" src="images/HUD/lifeBarColor.png" <="" div="" style="position: absolute;width: 90px;height: 32px;left: 3px;"></div>');
    $('#finalScreen').hide(); // je cache le final screen au cas ou je rejoue
    var vaisseaux = new Vaisseau("./images/ship/3.png");
    $('#game').html("<img id='vaisseau'/>"); // ajoute le vaiseau au jeu
    started.pause();
    $('#startScreen').hide();
    vaisseaux.initHtml();
    timer = new Timer(30);
    let start  = setInterval(function(){ game() }, 15);
    /*  38 = touche haut
    40 = touche bas
    32 = espace
    */
    $( document ).keydown(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 38){
            vaisseaux.move(-10);
        }
        if(code == 40){
            vaisseaux.move(10);
        }
        if(code == 32 && fire){
            vaisseaux.fire();
        }
    });

    function game(){
        showBestScore();
        if(!timer.check()){
            // si j'ai plus que 2 point et que le boss est a faux alors je le créee et je stop la génération
            if(point > 2){
                boss = true;
                fire = false;
            }
            if(boss == true){
                console.log(point);
                point == 2;
                boss = true;
                tirArray = [];
                if(soucoupeArray.length == 0){
                    creatSoucoupe(3);
                }
            }
            if(boss == false){
                let random = Math.floor((Math.random() * 50) + 1);
                if(random === 42){
                    creatSoucoupe(1);
                }
                if(random === 50){
                    creatSoucoupe(2);
                }
            }
            moveSoucoupe();
            moveTir();
            destroy();
            timer.display();
        }else{
            window.clearInterval(start); // je stop l'ecoute en boucle sur mon jeu car il a ete fini
            $('#game').html(""); // enleve tout les elements du jeu (tir/vaisseau/soucoupe)
            $('#finalScreen').css({
                'display' : 'flex',
            });
            if(localStorage.getItem("score") < point){
                localStorage.setItem("score",point);
                $('#form').show();
                $('.details').html('New record score !');
                $('.scoreboard').hide();
            }
            final.play();
            showBestScore();
            $('.scoreboard').html(" "+localStorage.getItem("score_name")+" - "+localStorage.getItem("score")+" ennemy destroy");
            $(document).off('keyup keydown keypress');
        }
    }
}

function showBestScore(){
    if(localStorage.getItem("score") == null){
        localStorage.setItem("score",0)
        $('#bestScore').text(localStorage.getItem("score"));
    }else{
        if(localStorage.getItem("score_name")){
            $('#bestScore').html(localStorage.getItem("score")+" - "+localStorage.getItem("score_name"));
        }else{
            $('#bestScore').html(localStorage.getItem("score"));
        }
    }
}

function creatSoucoupe(type){
    if(boss == true){
        //alert($('canvas').height()*6/100);
        let min = $('canvas').height()*6/100;
        let max = $('canvas').height()-$('canvas').height()*12/100;;
        //alert(max+" @ "+min);
        Math.floor(Math.random() * (max - min + 1) + min)
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        let soucoupe = new Soucoupe($('canvas').width()-50,random,type);
        soucoupe.initHtml();
    }else{
        if(soucoupeArray.length < 10){
            //alert($('canvas').height()*6/100);
            let min = $('canvas').height()*6/100;
            let max = $('canvas').height()-$('canvas').height()*12/100;;
           //alert(max+" @ "+min);
            Math.floor(Math.random() * (max - min + 1) + min)
            let random = Math.floor(Math.random() * (max - min + 1) + min);
            let soucoupe = new Soucoupe($('canvas').width()-50,random,type);
            soucoupe.initHtml();
        }
    }
};

function moveSoucoupe(){
    soucoupeArray.forEach(element => {
        //console.log(element);
        element.move();
        //element.display();
    });
}

function moveTir(){
    tirArray.forEach(element => {
        //console.log(element);
        element.move();
        //element.display();
    });
}

// VERIFIER SI 2 X est sur la même valeur
// VERIFIER SI Y est sur la valeur du vaiseau + taille vaisseau

function destroy(){
    soucoupeArray.forEach(soucoupe => {        
        tirArray.forEach(tir => {
            if((tir.posX >= soucoupe.posX)){
                if(tir.posY >= soucoupe.posY && tir.posY <= soucoupe.posY+$('#soucoupe').height()){
                    explosion.play();
                    tir.removeTir();
                    soucoupe.display();
                    soucoupe.removeSoucoupe();
                    point++;
                    if(point <= 0){
                        if(!($('#life').width() >= 86)){
                            $('#life').width($('#life').width()+5);
                        }
                    }else{
                        if(!($('#life').width() >= 86)){
                            $('#life').width($('#life').width()+5);
                        }
                    }
                }
            }
        });
    });
    
}

$('#newScore').click(function(){
    localStorage.setItem("score_name",$('#pseudo').val())
    $('#form').remove();
    $('.scoreboard').html(localStorage.getItem("score_name")+" - "+localStorage.getItem("score")+" ennemy destroy");
    $('.scoreboard').show();
});

$('#volume').click(function(){
    var clicks = $(this).data('clicks');
    started.muted = !clicks;
    final.muted = !clicks;
    explosion.muted = !clicks;
    missile.muted = !clicks;
    if(!clicks){
        $('#volume >img').attr('src',"./images/sound_off.svg");
    }else{
        $('#volume >img').attr('src',"./images/sound_on.svg");
    }
    $(this).data("clicks", !clicks); // donne le rsultat inverse du click dans attribut data
});

$('.start, .restart').click(function(){
    start();
    final.pause();
    final.currentTime = 0
});