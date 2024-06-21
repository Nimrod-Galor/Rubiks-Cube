class Cube{
    constructor(dimention, cubieSize){
        this.dimention = dimention;
        this.cubieSize = cubieSize;
        this.faces = [];
        this.colors = [
            color(255, 255, 255), // top white
            color(255, 0, 0), // front red
            color(0, 0, 255), // right blue
            color(255, 150, 0), //back orange
            color(0, 255, 0), // left green
            color() // bottom yellow
        ]
    }

    initFaces(){
        //initiate cube
        for(let z = 0; z < this.dimention; z++){
            for(let x = 0; x < this.dimention; x++){
                for(let y = 0; y < this.dimention; y++){
                    if(z === 0){// back face
                        let normal = createVector(0, 0, -1);
                        let f = new Face(normal, );
                        this.faces.push(f);     
                    }
                    
                }
            }
        }
    }

}