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
            color(255, 255, 0), // 5 bottom yellow
            color(51) // test
        ];
        this.orientation = [
            {faceId : 'back', normal: [0, 0, -1], isVisible : false},
            {faceId : 'front', normal: [0, 0, 1], isVisible : false},
            {faceId : 'top', normal: [0, -1, 0], isVisible : false},
            {faceId : 'bottom', normal: [0, 1, 0], isVisible : false},
            {faceId : 'right', normal: [1, 0, 0], isVisible : false},
            {faceId : 'left', normal: [-1, 0, 0], isVisible : false},
        ];
        this.cubeRotate = false;
        this.planeCut = [];
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
                        let f = new Face('back', 3, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = -R - this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                    
                    if(z === this.dimantion - 1){ // front face
                        let f = new Face('front', 1, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = R + this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(y === 0){ // top face
                        let f = new Face('top', 0, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = z * this.cubieSize - R;
                        let mz = R + this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(90, 0, 0);
                        this.faces.push(f);
                    }

                    if(y === this.dimantion - 1){ // bottom face
                        let f = new Face('bottom', 5, hierarchy);
                        let mx = x * this.cubieSize - R;
                        let my = z * this.cubieSize - R;
                        let mz = -R - this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(90, 0, 0);
                        this.faces.push(f);
                    }

                    if(x === 0){ // left face
                        let f = new Face('left', 4, hierarchy);
                        let mx = z * this.cubieSize - R;
                        let my = y * this.cubieSize - R;
                        let mz = -R - this.cubieSize * 0.5;
                        f.moveFace(mx, my, mz);
                        f.rotateFace(0, 90, 0);
                        this.faces.push(f);
                    }

                    if(x ===  this.dimantion - 1){ // right face
                        let f = new Face('right', 2, hierarchy);
                        let mx = z * this.cubieSize - R;
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
            if(this.faces[i].isVisible){
                this.faces[i].render();
            }
        }
    }

    rotateCube(x, y, z){
        // update face orientation normal
        for(let i = 0; i < this.orientation.length; i++){
            let thetaX = radians(x);
            let thetaY = radians(y);
            let thetaZ = radians(z);
            
            // Rotation matrices
            let Rx = rotationMatrixX(thetaX);
            let Ry = rotationMatrixY(thetaY);
            let Rz = rotationMatrixZ(thetaZ);
            // Combined rotation matrix Rz * Ry * Rx
            let R = multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);
            
            this.orientation[i].normal = rotatePoint(this.orientation[i].normal, R);
            
            cube.orientation[i].isVisible = isTriangleFacingCamera(cube.orientation[i].normal);
        }
        
        for(let i = 0 ; i < this.faces.length; i++){
            this.faces[i].rotateFace(x, y, z);
            this.faces[i].isVisible = cube.orientation[cube.orientation.findIndex(item => item.faceId === this.faces[i].type)].isVisible;
        }
    }

    faceClicked(x, y){
        for(let i = 0; i < this.faces.length; i++){
            if(this.faces[i].isVisible && isPointInPolygon(x, y, this.faces[i].vertices)){
                // click was inside face
                cube.selectedFaceId = i;
                return true;
            }
        }
        return false;
    }
}