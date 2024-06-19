

class Face{
    constructor(normal, pos, color){
        this.normal = normal;
        this.pos = pos;
        this.color = color;
    }
    
    render(){
        push();
        fill(this.color);
        noStroke();
        //rectMode(CENTER);
        
        //translate(this.normal.x * 50, this.normal.y * 50, this.normal.z * 50);
        translate(this.pos);
        rotate(HALF_PI, this.normal);
        
        //square(0, 0, 10);
        //rect(0, 0, 10, 10);
        plane(100, 100);

        pop();
    }
    
}