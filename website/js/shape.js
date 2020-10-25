
//points
/** 8    1    2
 *     + + + 
 *  7  + - +  3
 *     + + + 
 *  6    5    4
 */

class Shape{
    constructor(ctx, symbol, speed=3, hover=2, startingPoint = null){
        this.ctx = ctx;
        this.symbol = symbol;

        this.speed = speed
        this.hover = hover


        //point system based on distance from center
        //max 600

        this.currentPoint = startingPoint ? JSON.parse(JSON.stringify(startingPoint)) : {
            1: 30,
            2: 30,
            3: 30,
            4: 30,
            5: 30,
            6: 30,
            7: 30,
            8: 30,
        }
        this.displayPoint = startingPoint ? JSON.parse(JSON.stringify(startingPoint)) : {
            1: 30,
            2: 30,
            3: 30,
            4: 30,
            5: 30,
            6: 30,
            7: 30,
            8: 30,
        }
        this.gotoPoint = startingPoint ? JSON.parse(JSON.stringify(startingPoint)) : {
            1: 30,
            2: 30,
            3: 30,
            4: 30,
            5: 30,
            6: 30,
            7: 30,
            8: 30,
        }
        this.ifFlip = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
        }
    }

    tick(){
        Object.keys(this.currentPoint).map(key => {
            let current = this.currentPoint[key]
            let goto_ = this.gotoPoint[key]
            if(current == goto_){
                //let diff = this.displayPoint[key] - current
                //if(diff < -this.hover){
                //    this.ifFlip[key] = true
                //    this.displayPoint[key] = current - 1.9
                //}else if(diff > this.hover){
                //    this.ifFlip[key] = false
                //    this.displayPoint[key] = current + 1.9
                //}else{
                //    if(this.ifFlip[key]) this.displayPoint[key] += Math.random() * 0.6
                //    else this.displayPoint[key] -= Math.random() * 0.6
                //}
            }else{
                console.log("changing")
                if(Math.abs(current - goto_) < this.speed){
                    this.currentPoint[key] = this.gotoPoint[key]
                }else{
                    let newDis;
                    if(current > goto_) newDis = this.displayPoint[key] - this.speed
                    else newDis = this.displayPoint[key] + this.speed
    
                    if(this.displayPoint[key] == current){
                        this.currentPoint[key] = newDis
                        this.displayPoint[key] = newDis
                    }else{
                        if(Math.abs(this.displayPoint[key] - current) < this.speed){
                            this.displayPoint[key] = this.currentPoint[key]
                        }else{
                            if(this.displayPoint[key] > current){
                                this.displayPoint[key] = newDis
                            }else{
                                this.displayPoint[key] = newDis
                                this.currentPoint[key] = this.displayPoint[key]
                            }
                        }
                    } 
                }
            }
        })
    }

    goto(pointKey, dis){
        if(dis < 0) return false
        this.gotoPoint[pointKey] = dis
    }

    getPoints(canvasWidth, canvasHeight){
        let centerX = canvasWidth/2
        let centerY = canvasHeight/2
        //recalculate to save syntax
        return [ 
                centerX                                                 , centerY-(this.displayPoint[1]/600*centerY), 
                centerX+(this.getLen(this.displayPoint[2])/600*centerX) , centerY-(this.getLen(this.displayPoint[2])/600*centerY) , 
                centerX+(this.displayPoint[3]/600*centerX)              , centerY, 
                centerX+(this.getLen(this.displayPoint[4])/600*centerX) , centerY+(this.getLen(this.displayPoint[4])/600*centerY), 
                centerX                                                 , centerY+(this.displayPoint[5]/600*centerY), 
                centerX-(this.getLen(this.displayPoint[6])/600*centerX) , centerY+(this.getLen(this.displayPoint[6])/600*centerY), 
                centerX-(this.displayPoint[7]/600*centerX)              , centerY, 
                centerX-(this.getLen(this.displayPoint[8])/600*centerX) , centerY-(this.getLen(this.displayPoint[8])/600*centerY) , 
                centerX                                                 , centerY-(this.displayPoint[1]/600*centerY) 
            ]
    }

    getLen(hyp){
        return Math.sqrt(hyp*hyp/2)
    }
}


