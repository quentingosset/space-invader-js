// Classe représentant le timer 
class Timer{
    constructor(timing){
        this.timeout = new Date().getTime()+(timing*1000);
    }

    get start(){
        return this._start;
    }

    set start(value){
        this._start = value;
    }

    get timeout(){
        return this._timeout;
    }

    set timeout(value){
        this._timeout = value;
    }

    display(){
        let remaningTime = this.timeout+1000 - new Date().getTime();
        remaningTime = new Date(remaningTime);
        if(remaningTime.getSeconds() < 60){
            if(remaningTime.getSeconds() < 10){
                $("#chronotime").html("00:0"+remaningTime.getSeconds()); 
            }else{
                $("#chronotime").html("00:"+remaningTime.getSeconds());
            }
        }else{
            if(remaningTime.getMinutes() > 0){
                $("#chronotime").html("0"+remaningTime.getMinutes()+":"+remaningTime.getSeconds());
            }
        }   
    }


    check(){
        let remaningTime = Math.round((this.timeout - new Date().getTime())/1000);
        if(remaningTime < 0){
            return 1;
        }
    }
}