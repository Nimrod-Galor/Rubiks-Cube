class Cubie{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.matrix = createVector(x, y, z);
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.faces = [
            new Face('top'),
            new Face('bottom'),
            new Face('front'),
            new Face('back'),
            new Face('left'),
            new Face('right')
        ];
    }

    turnZ(angle){
        this.matrix.x = this.matrix.x * cos(angle) - this.matrix.y * sin(angle);
        this.matrix.y = this.matrix.x * sin(angle) + this.matrix.y * cos(angle);
        this.matrix.z = this.matrix.z;
        this.matrix = createVector(this.matrix.x, this.matrix.y, this.matrix.z);
        this.rotationZ += angle;
    }

    turnY(angle){
        this.matrix.x = this.matrix.x * cos(angle) - this.matrix.z * sin(angle);
        this.matrix.z = this.matrix.x * sin(angle) + this.matrix.z * cos(angle);
        this.matrix.y = this.matrix.y;
        this.matrix = createVector(this.matrix.x, this.matrix.y, this.matrix.z);
        this.rotationY += angle;
    }

    turnX(angle){
        this.matrix.y = this.matrix.y * cos(angle) - this.matrix.z * sin(angle);
        this.matrix.z = this.matrix.y * sin(angle) + this.matrix.z * cos(angle);
        this.matrix.x = this.matrix.x;
        this.matrix = createVector(this.matrix.x, this.matrix.y, this.matrix.z);
        this.rotationX += angle;
    }

    render(){
        push();
        // render box
        noFill();
        stroke(1);
        strokeWeight(4);
        //applyMatrix(this.matrix);
        
        translate(this.matrix.x * cubieSize, this.matrix.y * cubieSize, this.matrix.z * cubieSize);
        //rotateZ(this.rotationZ);
        box(cubieSize);
        
        // render faces
        for(let i = 0; i < this.faces.length; i++){
            this.faces[i].render();
        }
        pop();

    }
}