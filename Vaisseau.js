// Classe représentant le vaisseau 
class Vaisseau {
    // Constructeur
    constructor(img) {
        this.posX = 40;
        this.posY = ($('canvas').height() / 2);
        this.img = img;
        this.rechargement = false;
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

    get rechargement() {
        return this._rechargement;
    }

    set rechargement(value) {
        this._rechargement = value;
    }


    display() {
        var vaisseau = document.getElementById('vaisseau');
        // initial calcul for know the canvas position
        vaisseau.style.left = this.posX + "px";
        vaisseau.style.top = this.posY + "px";
    }

    // Initialise le vaisseau dans le html
    initHtml() {
        var vaisseau = document.getElementById('vaisseau');
        vaisseau.src = this.img;
        vaisseau.style.position = "absolute";
        vaisseau.style.top = this.posY + "px";
        vaisseau.style.left = this.posX + "px";
        this.display();
    }

    move(deplacement) {
        if (deplacement > 0) {
            if ((this.posY + deplacement + 40) <= $('canvas').height() - ($('canvas').height() * 6 / 100)) {
                this.posY += deplacement;
                this.display();
            }
        }
        if (deplacement < 0) {
            if ((this.posY + deplacement) >= 0 + ($('canvas').height() * 6 / 100)) {
                this.posY += deplacement;
                this.display();
            }
        }
    }

    fire() {
        if (!this.rechargement) {
            let tir = new Tir(this.posX + $('#vaisseau').width(), this.posY + $('#vaisseau').height() / 2,1);
            tir.initHtml();
            tir.display();
            missile.play();
            this.rechargement = true;
            var tirs = this;
            setTimeout(function () {
                tirs.rechargement = false;
            }, 100);
        }
    }
}