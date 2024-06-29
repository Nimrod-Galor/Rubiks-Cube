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
            {faceId : 'back', normal: createVector(0, 0, -1), isVisible : false},
            {faceId : 'front', normal: createVector(0, 0, 1), isVisible : false},
            {faceId : 'top', normal: createVector(0, -1, 0), isVisible : false},
            {faceId : 'bottom', normal: createVector(0, 1, 0), isVisible : false},
            {faceId : 'right', normal: createVector(1, 0, 0), isVisible : false},
            {faceId : 'left', normal: createVector(-1, 0, 0), isVisible : false},
        ];
        
        this.cubeRotate = false;
        this.cutRotate = false;
        this.planeCut = [];
        this.planeCutRotationAxis = createVector(0, 0, 0);
        this.planeCutRotaionMagnitude = radians(5);
        this.planeCutRotaionDone = 0;
    }

    initFaces(){
        //initiate cube
        let R = this.dimantion * this.cubieSize * 0.5;
        for(let z = 0; z < this.dimantion; z++){
            for(let x = 0; x < this.dimantion; x++){
                for(let y = 0; y < this.dimantion; y++){
                    let hierarchy = {z: z, x:x, y: y};
                    if(z === 0){// back face
                        //let normal = createVector(0, 0, -1);
                        //let f = new Face('back', normal, 3, hierarchy);
                        let f = new Face('back', 3, hierarchy);
                        f.normal.z = -1
                        let mx = (x * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let my = (y * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let mz = R * -1;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                    
                    if(z === this.dimantion - 1){ // front face
                        //let normal = createVector(0, 0, 1);
                        //let f = new Face('front', normal, 1, hierarchy);
                        let f = new Face('front', 1, hierarchy);
                        let mx = (x * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let my = (y * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let mz = R;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(y === 0){ // top face
                        //let normal = createVector(0, 1, 0);
                        //let f = new Face('top', normal, 0, hierarchy);
                        let f = new Face('top', 0, hierarchy);
                        let mx = (x * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let my = (-R - this.cubieSize * 0.5) + (this.cubieSize * 0.5);
                        let mz = (z * this.cubieSize - R) + (this.cubieSize * 0.5);
                        f.rotateFace(90, 0, 0);
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(y === this.dimantion - 1){ // bottom face
                        //let normal = createVector(0, -1, 0);
                        //let f = new Face('bottom', normal, 5, hierarchy);
                        let f = new Face('bottom', 5, hierarchy);
                        let mx = (x * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let my = (R + this.cubieSize * 0.5) - (this.cubieSize * 0.5);
                        let mz = (z * this.cubieSize - R) + (this.cubieSize * 0.5);
                        f.rotateFace(90, 0, 0);
                        f.normal.y = 1;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(x === 0){ // left face
                        //let normal = createVector(-1, 0, 0);
                        //let f = new Face('left', normal, 4, hierarchy);
                        let f = new Face('left', 4, hierarchy);
                        let mx = (-R - this.cubieSize * 0.5) + (this.cubieSize * 0.5);
                        let my = (y * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let mz = (z * this.cubieSize - R) + (this.cubieSize * 0.5);
                        f.rotateFace(0, 90, 0);
                        f.normal.x = -1;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(x ===  this.dimantion - 1){ // right face
                        //let normal = createVector(1, 0, 0);
                        //let f = new Face('right', normal, 2, hierarchy);
                        let f = new Face('right', 2, hierarchy);
                        let mx = (R + this.cubieSize * 0.5) - (this.cubieSize * 0.5);
                        let my = (y * this.cubieSize - R) + (this.cubieSize * 0.5);
                        let mz = (z * this.cubieSize - R) + (this.cubieSize * 0.5);
                        f.rotateFace(0, 90, 0);
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                }
            }
        }
    }

    render(){
        if(this.planeCut.length > 0){
            this.rotateCutPlane(this.planeCutRotaionMagnitude);
            this.planeCutRotaionDone += this.planeCutRotaionMagnitude;
            console.log(degrees(this.planeCutRotaionDone));
            

            if(Math.abs(degrees(this.planeCutRotaionDone)) >= 89){
                console.log("IN");

                // roatae back 90 degrees
                this.rotateCutPlane(this.planeCutRotaionDone * -1);
                this.planeCut = [];
                cube.cutRotate = false;
                this.planeCutRotaionDone = 0
            }
            
        }

        for(let i = 0 ; i < this.faces.length; i++){
            if(this.faces[i].isVisible){
                this.faces[i].render();
            }
        }
    }

    rotateCube(x, y, z){
        let rotationMatrix = getRotationMatrix(x, y, z);
        for(let i = 0; i < this.orientation.length; i++){
            this.orientation[i].normal.pointRotate(rotationMatrix);
            //this.orientation[i].isVisible = isTriangleFacingCamera(this.orientation[i].normal);
        }
        
        for(let i = 0 ; i < this.faces.length; i++){
            this.faces[i].rotateFace(x, y, z);
            //this.faces[i].isVisible = this.faces[i].isFacingCamers();
        }
    }

    rotateCutPlane(angleRadian){
        for(let i = 0; i < this.planeCut.length; i++){
            //loop points in vertice (face)
            for(let pi = 0 ; pi < this.planeCut[i].vertices.length; pi ++){
                this.planeCut[i].vertices[pi].rotatePointAroundVector(this.planeCutRotationAxis, angleRadian);
            }
        }
    }

    faceClicked(x, y){
        for(let i = 0; i < this.faces.length; i++){
            if(this.faces[i].isVisible && isPointInPolygon(x, y, this.faces[i].vertices)){
                // click was inside face
                this.selectedFaceId = i;
                return true;
            }
        }
        return false;
    }
}


// // Function to rotate a point around a given axis
// function rotatePointAroundVector(point, axis, theta) {
//     // Normalize the axis vector
//     let axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
//     let k = [axis[0] / axisLength, axis[1] / axisLength, axis[2] / axisLength];

//     // Calculate the dot product of k and point
//     let dotProduct = k[0] * point[0] + k[1] * point[1] + k[2] * point[2];

//     // Calculate the cross product of k and point
//     let crossProduct = [
//         k[1] * point[2] - k[2] * point[1],
//         k[2] * point[0] - k[0] * point[2],
//         k[0] * point[1] - k[1] * point[0]
//     ];

//     // Calculate the rotated point
//     let cosTheta = Math.cos(theta);
//     let sinTheta = Math.sin(theta);
//     let rotatedPoint = [
//         point[0] * cosTheta + crossProduct[0] * sinTheta + k[0] * dotProduct * (1 - cosTheta),
//         point[1] * cosTheta + crossProduct[1] * sinTheta + k[1] * dotProduct * (1 - cosTheta),
//         point[2] * cosTheta + crossProduct[2] * sinTheta + k[2] * dotProduct * (1 - cosTheta)
//     ];

//     return rotatedPoint;
// }