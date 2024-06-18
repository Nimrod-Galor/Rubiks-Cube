class Face{
    constructor(normal, trans, color){
        this.normal = normal;
        this.trans = trans;
        this.color = color;
    }

    render(){
        push();
        fill(this.color);
        noStroke();
        rectMode(CENTER);
        translate(this.trans);
        rotate(HALF_PI, this.normal);
        //square(0, 0, 10);
        rect(0, 0, 10, 10);
        pop();
    }
}