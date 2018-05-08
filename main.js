var tirArray;
var soucoupeArray;
var point;
var slow;
var fire;
var superPouvoir;
var started = new Audio('sound/star-wars-theme-song.mp3');
var final = new Audio('sound/imperial_march.mp3');
var missile = new Audio('sound/Missile.mp3');
var explosion = new Audio('sound/explosion.mp3');

function start() {
    soucoupeArray = [];
    tirArray = [];
    point = 0;
    slow = false;
    fire = 0;
    superPouvoir = false;
    $('#scoring').html("");
    $('#finalScreen').hide(); // je cache le final screen au cas ou je rejoue
    var vaisseaux = new Vaisseau("./images/starfighter.png");
    $('#game').html("<img id='vaisseau'/>"); // ajoute le vaiseau au jeu
    started.pause();
    $('#startScreen').hide();
    vaisseaux.initHtml();
    timer = new Timer(30);
    let start = setInterval(function () {
        game()
    }, 15);
    /*  38 = touche haut
    40 = touche bas
    32 = espace
    */
    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 38) {
            vaisseaux.move(-10);
        }
        if (code == 40) {
            vaisseaux.move(10);
        }
        if (code == 32) {
            if(fire < 5){
               vaisseaux.fire();
                fire++;
            }
        }
        if (code == 65) { // touche a = ralentir
            slow = true;
            setTimeout(function(){slow = false},3000);
        }
        if (code == 83) { // touche s = super Pouvoir
            if(!superPouvoir){
                superpouvoir();
                superPouvoir = true;
            }
        }
    });

    function game() {
        showBestScore();
        if (!timer.check()) {
            let random = Math.floor((Math.random() * 50) + 1);
            if (random === 42) {
                creatSoucoupe(1);
            }
            if (random === 50) {
                creatSoucoupe(2);
            }
            moveSoucoupe();
            moveTir();
            destroy();
            timer.display();
        } else {
            window.clearInterval(start); // je stop l'ecoute en boucle sur mon jeu car il a ete fini
            $('#game').html(""); // enleve tout les elements du jeu (tir/vaisseau/soucoupe)
            $('#finalScreen').css({
                'display': 'flex',
            });
            if (localStorage.getItem("score") < point) {
                localStorage.setItem("score", point);
                $('#form').show();
                $('.details').html('New record score !');
                $('.scoreboard').hide();
            }
            final.play();
            showBestScore();
            $('.scoreboard').html(" " + localStorage.getItem("score_name") + " - " + localStorage.getItem("score") + " ennemy destroy");
            $(document).off('keyup keydown keypress');
        }
    }
}

function superpouvoir(){
     soucoupeArray.forEach(element => {
         $("#soucoupe").attr('data-id',element._id).remove();
    });
    point += soucoupeArray.length;
    soucoupeArray = [];
    console.log(point);
    showPoint();
}

function showBestScore() {
    if (localStorage.getItem("score") == null) {
        localStorage.setItem("score", 0)
        $('#bestScore').text(localStorage.getItem("score"));
    } else {
        if (localStorage.getItem("score_name")) {
            $('#bestScore').html(localStorage.getItem("score") + " - " + localStorage.getItem("score_name"));
        } else {
            $('#bestScore').html(localStorage.getItem("score"));
        }
    }
}

function creatSoucoupe(type) {
    if (soucoupeArray.length < 10) {
        let min = $('canvas').height() * 6 / 100;
        let max = $('canvas').height() - $('canvas').height() * 12 / 100;;
        Math.floor(Math.random() * (max - min + 1) + min)
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        let soucoupe = new Soucoupe($('canvas').width() - 50, random, type);
        soucoupe.initHtml();
    }
};

function moveSoucoupe() {
    soucoupeArray.forEach(element => {
        if(slow){
            element.move(1);
        }else{
            element.move();
        }
        /*let random = Math.floor((Math.random() * 50) + 1);
        if (random === 42) {
            element.tir();
        }*/

    });
}

function moveTir() {
    tirArray.forEach(element => {
        element.move();
    });
}

// VERIFIER SI 2 X est sur la même valeur
// VERIFIER SI Y est sur la valeur du vaiseau + taille vaisseau

function destroy() {
    soucoupeArray.forEach(soucoupe => {
        tirArray.forEach(tir => {
            if ((tir.posX >= soucoupe.posX)) {
                if (tir.posY >= soucoupe.posY && tir.posY <= soucoupe.posY + $('#soucoupe').height()) {
                    tir.removeTir();
                    soucoupe.display();
                    if(soucoupe.removeSoucoupe()){
                        point++;
                        if (point <= 0) {
                            $('#scoring').find('img:first').remove();
                        } else {
                            $('#scoring').prepend("<img src='./images/heart.png'>");
                        }
                    }
                }
            }
        });
    });

}

function showPoint(){
   $('#scoring').find('img').remove(); 
    if(point > 0){
        for(i=0;i<point;i++){
            $('#scoring').prepend("<img src='./images/heart.png'>");
        }
    }else{
        for(i=point;i<0;i++){
            $('#scoring').prepend("<img src='./images/heart_break2.png'>");
        }
    }
}

$('#newScore').click(function () {
    localStorage.setItem("score_name", $('#pseudo').val())
    $('#form').remove();
    $('.scoreboard').html(localStorage.getItem("score_name") + " - " + localStorage.getItem("score") + " ennemy destroy");
    $('.scoreboard').show();
});

$('#volume').click(function () {
    var clicks = $(this).data('clicks');
    started.muted = !clicks;
    final.muted = !clicks;
    explosion.muted = !clicks;
    missile.muted = !clicks;
    if (!clicks) {
        $('#volume >img').attr('src', "./images/sound_off.svg");
    } else {
        $('#volume >img').attr('src', "./images/sound_on.svg");
    }
    $(this).data("clicks", !clicks); // donne le rsultat inverse du click dans attribut data
});

$('.start, .restart').click(function () {
    start();
    final.pause();
    final.currentTime = 0
});

