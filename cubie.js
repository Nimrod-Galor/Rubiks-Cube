class Cubie{
    constructor(_x, _y, _z){
        this.matrix = [];//_matrix;
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.hiegh = false;
    }

    show(){
        // Begin the drawing group.
        push();
        fill(255);
        if(this.height){
            fill(255, 0, 0);
        }
        stroke(1);
        strokeWeight(4);
        //pushMatrix();
        applyMatrix(this.matrix);
        box(10);
        //resetMatrix();
        // End the drawing group.
        pop();
    }

    updateMatrix(){
        // this.x = _x;
        // this.y = _y;
        // this.z = _z;
        this.matrix = [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 100 * this.x, 100 * this.y, 100 * this.z, 1];
    }
}