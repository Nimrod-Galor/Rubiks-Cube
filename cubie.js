class Cubie{
    constructor(_matrix){
        this.matrix = _matrix;
    }

    show(){
        // Begin the drawing group.
        push();
        fill(55);
        stroke(1.0);
        //strokeWeight(0.01);
        //pushMatrix();
        applyMatrix(this.matrix);
        box(10);
        //resetMatrix();
        // End the drawing group.
        pop();
    }
}