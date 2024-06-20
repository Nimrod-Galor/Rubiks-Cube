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
        translate(this.pos);
        rotate(HALF_PI, this.normal);
        plane(100, 100);
        pop();
    }
}