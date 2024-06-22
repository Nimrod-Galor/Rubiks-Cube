class Cube{
    constructor(dimantion, cubieSize){
        this.dimantion = dimantion;
        this.cubieSize = cubieSize;
        this.faces = [];
        this.colors = [
            color(255, 255, 255), // 0 top white
            color(255, 0, 0), // 1 front red
            color(0, 0, 255), // 2 right blue
            color(255, 150, 0), // 3 back orange
            color(0, 255, 0), // 4 left green
            color(255, 255, 0) // 5 bottom yellow
        ]
    }

    initFaces(){
        // SET CAMERA DISTANCE
        camera(0, 0, Math.min(this.dimantion * 250, 6000));

        //initiate cube
        let R = this.dimantion * 0.5  * this.cubieSize - (this.cubieSize * 0.5);
        for(let z = 0; z < this.dimantion; z++){
            for(let x = 0; x < this.dimantion; x++){
                for(let y = 0; y < this.dimantion; y++){
                    let hierarchy = {z: z, x:x, y: y};
                    if(z === 0){// back face
                        let normal = createVector(0, 0, -1);
                        let f = new Face(normal, 3, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = -R - this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                    
                    if(z === this.dimantion - 1){ // front face
                        let normal = createVector(0, 0, 1);
                        let f = new Face(normal, 1, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = R + this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(y === 0){ // top face
                        let normal = createVector(0, 1, 0);
                        let f = new Face(normal, 0, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = z * this.cubieSize - R;
                        let mz = R + this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(90, 0, 0);
                        this.faces.push(f);
                    }

                    if(y === this.dimantion - 1){ // bottom face
                        let normal = createVector(0, -1, 0);
                        let f = new Face(normal, 5, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = z * this.cubieSize - R;
                        let mz = -R - this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(90, 0, 0);
                        this.faces.push(f);
                    }

                    if(z === 0){ // left face
                        let normal = createVector(-1, 0, 0);
                        let f = new Face(normal, 4, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = -R - this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(0, 90, 0);
                        this.faces.push(f);
                    }

                    if(z ===  this.dimantion - 1){ // right face
                        let normal = createVector(1, 0, 0);
                        let f = new Face(normal, 2, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = R + this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(0, 90, 0);
                        this.faces.push(f);
                    }
                }
            }
        }
    }

    render(){
        for(let i = 0 ; i < this.faces.length; i++){
            this.faces[i].render();
        }
    }

    rotateCube(x, y, z){
        for(let i = 0 ; i < this.faces.length; i++){
            this.faces[i].rotateFace(x, y, z);
        }
    }

}