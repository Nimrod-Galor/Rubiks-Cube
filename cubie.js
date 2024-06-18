class Cubie{
    constructor(_x, _y, _z){
        this.matrix = [];//_matrix;
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.faces = [];
        this.faces[0] = new Face(createVector(0, 0, -1), createVector(0, 0, -5),  color(0, 0, 255));
        this.faces[1] = new Face(createVector(0, 0, 1), createVector(0, 0, 5), color(0, 255, 0));
        this.faces[2] = new Face(createVector(0, 1, 0), createVector(5, 0, 0), color(255, 255, 255));
        this.faces[3] = new Face(createVector(0, -1, 0), createVector(-5, 0, 0), color(255, 255, 0));
        this.faces[4] = new Face(createVector(1, 0, 0), createVector(0, 5, 0), color(255, 150, 0));
        this.faces[5] = new Face(createVector(-1, 0, 0), createVector(0, -5, 0), color(255, 0, 0));
            }

    render(){
        // Begin the drawing group.
        push();
        //fill(255);
        noFill();
        stroke(1);
        strokeWeight(4);
        applyMatrix(this.matrix);
        box(10);
        
        // render faces
        for(let i=0; i<this.faces.length; i++){
            this.faces[i].render();
        }
        // End the drawing group.
        pop();
    }

    updateMatrix(){
        this.matrix = [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 100 * this.x, 100 * this.y, 100 * this.z, 1];
    }
}