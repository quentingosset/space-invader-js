// Classe de tir du vaisseau
class Tir{
    // Constructeur
    constructor(posX,posY){
        this.posX = posX;
        this.posY = posY;
        this.img = "./images/shoot/7.png";
        this.id = new Date().getTime();
        tirArray.push(this);
    }

    get posY(){
        return this._posY;
    }

    set posY(value){
        this._posY = value;
    }

    get posX(){
        return this._posX;
    }

    set posX(value){
        this._posX = value;
    }

    get img(){
        return this._img;
    }

    set img(value){
        this._img = value;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    // Initialise le tir dans le html
    initHtml(){
        var tir = $('#game');
        //var tir = document.getElementById('tir');
        $('#game').prepend( "<img id='tir' data-id='"+this.id+"' src='"+this.img+"'/>" );
        this.display();
        
    }

    removeTir(){
        let tir = $("#tir[data-id='"+this.id+"']");
        let index = tirArray.findIndex( (el) => el.id === this.id )
        tirArray.splice(index,1)
        tir.remove();
    }
    display(){
        let tir = $("#tir[data-id='"+this.id+"']");
        let index = tirArray.findIndex( (el) => el.id === this.id )
        if(this.posX > $('canvas').width()-31){
            //console.log("delete"+index);
            tirArray.splice(index,1)
            tir.remove();
        }
        tir.css({
            'position' : 'absolute',
            'top' : this.posY+"px",
            'left' : this.posX+"px",
         });
         //tir.attr("alt",this.posY)
    }

    move(){
        this.posX += 5;
        this.display();   
    }
}