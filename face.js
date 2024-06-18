class Face{
    constructor(normal, trans, color){
        this.normal = normal;
        this.trans = trans;
        this.color = color;
    }

    turnZ(angle){
        let x = round(this.normal.x * cos(angle) - this.normal.y - sin(angle));
        let y = round(this.normal.x * sin(angle) + this.normal.y - cos(angle));
        let z = round(this.normal.z);
        this.normal = createVector(x, y, z);
    }

    turnY(angle){
        let x = round(this.normal.x * cos(angle) - this.normal.z - sin(angle));
        let z = round(this.normal.x * sin(angle) + this.normal.z - cos(angle));
        let y = round(this.normal.y);
        this.normal = createVector(x, y, z);
    }

    turnX(angle){
        let y = round(this.normal.y * cos(angle) - this.normal.z - sin(angle));
        let z = round(this.normal.y * sin(angle) + this.normal.z - cos(angle));
        let x = round(this.normal.x);
        this.normal = createVector(x, y, z);
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