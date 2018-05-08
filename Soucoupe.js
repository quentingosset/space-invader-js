// Classe de soucoupe
class Soucoupe{
    // Constructeur
    constructor(posX,posY,type){
        /**
         * TYPE 1 = level 1 ennnemy
         * TYPE 2 = level 2 ennemy
         */
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.monte = true;
        if(this.type == 1){
            this.img = "./images/ship/11.png";
        }
        if(this.type == 2){
            this.img = "./images/ship/4.png";
        }
        if(this.type == 3){
            this.img = "./images/ship/8.png";
        }
        this.id = new Date().getTime();
        soucoupeArray.push(this);
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

    get type(){
        return this._type;
    }

    set type(value){
        this._type = value;
    }

    // Initialise le tir dans le html
    initHtml(){
        var tir = $('#game');
        //var tir = document.getElementById('tir');
        $('#game').prepend( "<img id='soucoupe' data-id='"+this.id+"' src='"+this.img+"'/>" );
        this.display();
        
    }

    removeSoucoupe(){
        let soucoupe = $("#soucoupe[data-id='"+ this.id + "']");
        let index = soucoupeArray.findIndex( (el) => el.id === this.id );
        soucoupe.attr("src","./images/explosion.gif");
        soucoupe.css({
            'width': '64px',
            'height': '64px',

        });
            soucoupeArray.splice(index,1);
            setInterval(function(){ soucoupe.remove(); }, 500); 
        //soucoupeArray.splice(index,1)
        //soucoupe.remove();
    }

    display(){
        //console.log(this.id+" | "+this.posX );
        let soucoupe = $("#soucoupe[data-id='"+ this.id + "']");
        let index = soucoupeArray.findIndex( (el) => el.id === this.id )
        if(this.posX < 0){
            this.posX = 0;
            soucoupeArray.splice(index,1)
            soucoupe.remove();
            if(point > 0){
                point--;
                $('#life').width($('#life').width()-5);
            }
            else{
                point--;
                $('#life').width($('#life').width()-5);
            }
        }
        soucoupe.css({
            'position' : 'absolute',
            'top' : this.posY+"px",
            'left' : this.posX+"px",
         });
         soucoupe.attr("alt",this.posY)
    }

    move(){
        if(this.type == 1){
            this.posX -= 2;
        }
        if(this.type == 2){
            this.posX -= 2.5;
        } 
        if(this.type == 3){
            this.posX = $('canvas').width()-($('canvas').width()*(50/100));
            //console.log(this.posY);
            //console.log($('canvas').height());
            if(this.monte){
                if((this.posY+5) > 0+($('canvas').height()*6/100)){
                    this.posY -= 2;    
                }else{
                    this.monte = false;
                }
            }
            if(!this.monte){
                if(this.posY+5+100 < $('canvas').height()-($('canvas').height()*6/100)){
                    this.posY += 2;
                }else{
                    this.monte = true;
                }
            }
                
        } 
        this.display();
    }
}