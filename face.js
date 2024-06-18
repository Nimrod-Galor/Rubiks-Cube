

class Face{
    constructor(type){
        this.type = type;
        this.faceTypes = {
            top : {
                normal : createVector(1, 0, 0),
                pos : createVector(0, -50, 0),
                color : color(255, 255, 0)
            },
            bottom : {
                normal : createVector(-1, 0, 0),
                pos : createVector(0, 50, 0),
                color : color(255, 255, 255)
            },
            front : {
                normal : createVector(0, 0, 1),
                pos : createVector(0, 0, 50),
                color : color(255, 0, 0)
            },
            back : {
                normal : createVector(0, 0, 1),
                pos : createVector(0, 0, -50),
                color : color(255, 150, 0)
            },
            left : {
                normal : createVector(0, 1, 0),
                pos : createVector(-50, 0, 0),
                color : color(0, 0, 255)
            },
            right : {
                normal : createVector(0, -1, 0),
                pos : createVector(50, 0, 0),
                color : color(0, 255, 0)
            },
        }
    }
    
    render(){
        push();
        fill(this.faceTypes[this.type].color);
        noStroke();
        //rectMode(CENTER);
        
        //translate(this.normal.x * 50, this.normal.y * 50, this.normal.z * 50);
        translate(this.faceTypes[this.type].pos);
        rotate(HALF_PI, this.faceTypes[this.type].normal);
        
        //square(0, 0, 10);
        //rect(0, 0, 10, 10);
        plane(100, 100);
        pop();
    }
    
}