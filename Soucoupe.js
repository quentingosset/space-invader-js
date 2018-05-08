// Classe de soucoupe
class Soucoupe {
    // Constructeur
    constructor(posX, posY, type) {
        /**
         * TYPE 1 = level 1 ennnemy
         * TYPE 2 = level 2 ennemy
         */
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        if (this.type == 1) {
            this.img = "./images/tiefighter.png";
            this.deplacement = 2;
            this.life = 1;
        }
        if (this.type == 2) {
            this.img = "./images/RepublicCruiser.png";
            this.deplacement = 2.5;
            this.life = 1;
        }
        this.id = new Date().getTime();
        soucoupeArray.push(this);
    }

    get posY() {
        return this._posY;
    }

    set posY(value) {
        this._posY = value;
    }

    get posX() {
        return this._posX;
    }

    set posX(value) {
        this._posX = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    // Initialise le tir dans le html
    initHtml() {
        var tir = $('#game');
        $('#game').prepend("<img id='soucoupe' data-id='" + this.id + "' src='" + this.img + "'/>");
        this.display();

    }

    removeSoucoupe() {
        this.life--;
        fire--;
        if(this.life == 0){
            let soucoupe = $("#soucoupe[data-id='" + this.id + "']");
            let index = soucoupeArray.findIndex((el) => el.id === this.id);
            explosion.play();
            soucoupe.attr("src", "./images/explosion.gif");
            soucoupe.css({
                'width': '64px',
                'height': '64px',

            });
            soucoupeArray.splice(index, 1);
            setInterval(function () {
                soucoupe.remove();
            }, 1000);
            return 1;
            
        }
        return 0;
    }

    display() {
        let soucoupe = $("#soucoupe[data-id='" + this.id + "']");
        let index = soucoupeArray.findIndex((el) => el.id === this.id)
        if (this.posX < 0) {
            this.posX = 0;
            soucoupeArray.splice(index, 1)
            soucoupe.remove();
            if (point > 0) {
                point--;
                $('#scoring').find('img:first').remove();
            } else {
                point--;
                $('#scoring').prepend("<img src='./images/heart_break2.png'>");
            }
        }
        soucoupe.css({
            'position': 'absolute',
            'top': this.posY + "px",
            'left': this.posX + "px",
        });
        soucoupe.attr("alt", this.posY)
    }

    move(value) {
        if(typeof value == 'undefined'){
            if (this.type == 1) {
                this.posX -= this.deplacement;
            }
            if (this.type == 2) {
                this.posX -= this.deplacement;
            }
        }else{
            if (this.type == 1) {
                this.posX -= value;
            }
            if (this.type == 2) {
                this.posX -= value+0.5;
            }
        }
        this.display();
    }
    
    tir(){
        let tir = new Tir(this.posX - $('#soucoupe').width(), this.posY + $('#soucoupe').height() / 2,2);
    }
}