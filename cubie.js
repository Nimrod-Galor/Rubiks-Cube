/*
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
        */




class Cubie{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.matrix = createVector(x, y, z);
        
        this.faces = [
            new Face(createVector(1, 0, 0), createVector(0, -50, 0), color(255, 255, 0)),   //'top' 0
            new Face(createVector(-1, 0, 0), createVector(0, 50, 0), color(255, 255, 255)), //'bottom' 1
            new Face(createVector(0, 0, 1), createVector(0, 0, 50), color(255, 0, 0)),  //'front' 2
            new Face(createVector(0, 0, -1), createVector(0, 0, -50), color(255, 150, 0)),   //'back' 3
            new Face(createVector(0, 1, 0), createVector(-50, 0, 0), color(0, 0, 255)), //'left' 4
            new Face(createVector(0, -1, 0), createVector(50, 0, 0), color(0, 255, 0))  //'right' 5
        ];
        this.isCut = false;
    }

    updateMatrix(){
        this.matrix = createVector(this.x, this.y, this.z);
    }

    faceRotation(){
//console.log(axis);
        let tmpArr = [];
        if(axis.z === 1){
            tmpArr = [this.faces[0], this.faces[5], this.faces[1], this.faces[4]];
        }

        if(axis.x === 1){
            tmpArr = [this.faces[3], this.faces[1], this.faces[2], this.faces[0]];
        }

        if(axis.y === 1){
            tmpArr = [this.faces[2], this.faces[5], this.faces[3], this.faces[4]];
        }

        if(direction == -1){
            let firstRem = tmpArr[0].color;
            for(let i = 0; i < tmpArr.length-1; i++){
                tmpArr[i].color = tmpArr[i+1].color;
            }
            tmpArr[tmpArr.length-1].color = firstRem;
        }else{
            let lastRem = tmpArr[tmpArr.length - 1].color;
            for(let i = tmpArr.length-1; i > 0; i--){
                tmpArr[i].color = tmpArr[i-1].color;
            }
            tmpArr[0].color = lastRem;
        }
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