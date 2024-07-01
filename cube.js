class Cube{
    constructor(dimantion, cubieSize){
        this.dimantion = dimantion;
        this.cubieSize = cubieSize;
        this.faces = [];
        this.colors = [
            color(255, 255, 255), // 0 top white
            color(255, 0, 0),       // 1 front red
            color(0, 0, 255),       // 2 right blue
            color(255, 150, 0),     // 3 back orange
            color(0, 255, 0),       // 4 left green
            color(255, 255, 0),     // 5 bottom yellow
            color(51)               // test
        ];
        this.normalX = createVector(1, 0, 0);
        this.normalY = createVector(0, 1, 0);
        this.normalZ = createVector(0, 0, 1);
        
        this.cubeRotate = false;
        this.cutRotate = false;
        this.planeCut = [];
        this.planeCutRotationAxis = createVector(0, 0, 0);
        this.planeCutRotaionMagnitude = radians(5);
        this.planeCutRotaionDone = 0;
        this.faceCutType = '';
    }

    initFaces(){
        //initiate cube
        let R = this.dimantion * this.cubieSize * 0.5;
        for(let z = 0; z < this.dimantion; z++){
            for(let x = 0; x < this.dimantion; x++){
                for(let y = 0; y < this.dimantion; y++){
                    let hierarchy = {z: z, x: x, y: y};
                    let mx = (x * this.cubieSize - R) + (this.cubieSize * 0.5);
                    let my = (y * this.cubieSize - R) + (this.cubieSize * 0.5);
                    let mz = (z * this.cubieSize - R) + (this.cubieSize * 0.5);
                    if(z === 0){                    // back face
                        let f = new Face('back', 3, hierarchy);
                        f.normal.z = -1;
                        let mz = -R;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                    
                    if(z === this.dimantion - 1){   // front face
                        let f = new Face('front', 1, hierarchy);
                        let mz = R;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(y === 0){                    // top face
                        let f = new Face('top', 0, hierarchy);
                        let my = -R;
                        f.rotateFace(90, 0, 0);
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                    
                    if(y === this.dimantion - 1){   // bottom face
                        let f = new Face('bottom', 5, hierarchy);
                        let my = R;
                        f.rotateFace(-90, 0, 0);
                        f.normal.y = 1;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                    if(x === 0){                    // left face
                        let f = new Face('left', 4, hierarchy);
                        let mx = -R;
                        f.rotateFace(0, -90, 0);
                        f.normal.x = -1;
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }

                    if(x ===  this.dimantion - 1){  // right face
                        let f = new Face('right', 2, hierarchy);
                        let mx = R;
                        f.rotateFace(0, 90, 0);
                        f.moveFace(mx, my, mz);
                        this.faces.push(f);
                    }
                }
            }
        }
        // sort faces by face type
        let sortingTable = {'top' : 1, 'back' : 2, 'left' : 3, 'bottom': 4, 'front' : 5, 'right' : 6};
        this.faces.sort((a, b) => sortingTable[a.type] - sortingTable[b.type]);
    }

    render(){
        if(this.planeCut.length > 0){
            this.rotateCutPlane(this.planeCutRotaionMagnitude);
            this.planeCutRotaionDone += this.planeCutRotaionMagnitude;
            //console.log(degrees(this.planeCutRotaionDone));
            

            if(Math.abs(degrees(this.planeCutRotaionDone)) >= 89){
                console.log("IN");
                this.finalizeCutPlane();
            }
            
        }

        for(let i = 0 ; i < this.faces.length; i++){
            if(this.faces[i].isVisible){// render only visible faces
                this.faces[i].render();
            }
        }
    }

    rotateCube(x, y, z){
        // update cube orientation normal
        let rotationMatrix = getRotationMatrix(x, y, z);
        this.normalX.pointRotate(rotationMatrix);
        this.normalY.pointRotate(rotationMatrix);
        this.normalZ.pointRotate(rotationMatrix);
        // rotate faces
        for(let i = 0 ; i < this.faces.length; i++){
            this.faces[i].rotateFace(x, y, z);
        }
    }

    rotateCutPlane(angleRadian){
        for(let i = 0; i < this.planeCut.length; i++){
            //loop points in vertice (face)
            for(let pi = 0 ; pi < this.planeCut[i].vertices.length; pi ++){
                this.planeCut[i].vertices[pi].rotatePointAroundVector(this.planeCutRotationAxis, angleRadian);
            }
            this.planeCut[i].normal.rotatePointAroundVector(this.planeCutRotationAxis, angleRadian);
            this.planeCut[i].isFacingCamers();
        }
    }

    finalizeCutPlane(){
        // roatae back 90 degrees
        this.rotateCutPlane(this.planeCutRotaionDone * -1);
        // update face colors
        if(this.faceCutType != ''){
            console.log('faceCutType', this.faceCutType);
            //extract face plane
            let faceCut = this.planeCut.filter(f => f.type === this.faceCutType);
            //convert plane array to matrix
            let faceMatrix = [];
            let index = 0;
            for(let r = 0; r <= 2; r++){
                faceMatrix[r] = [];
                for(let c = 0; c <= 2; c++){
                    faceMatrix[r][c] = faceCut[index].colorIndex;
                    index++;
                }
            }
            // rotate matrix
            faceMatrix = this.planeCutRotaionMagnitude >= 0 ? faceMatrix[0].map((val, index) => faceMatrix.map(row => row[index]).reverse()) : faceMatrix[0].map((val, index) => faceMatrix.map(row => row[row.length-1-index]));

            // update colors
            index = 0;
            for(let r = 0; r <= 2; r++){
                for(let c = 0; c <= 2; c++){
                    // update face plane cubie colors
                    faceCut[index].colorIndex = faceMatrix[r][c];
                    index++;
                }
            }

            //remove face cut from plane cut
            this.planeCut = this.planeCut.filter(f => f.type !== this.faceCutType);
        }

        // rotate plane colors
        let modArr;
        if(this.planeCutRotaionMagnitude <= 0){
            let startItems = JSON.parse(JSON.stringify(this.planeCut.slice(0, -this.dimantion)));
            let endItems = JSON.parse(JSON.stringify(this.planeCut.slice(-this.dimantion)));
            modArr = [...endItems, ...startItems];
        }else{
            let startItems = JSON.parse(JSON.stringify(this.planeCut.slice(0, this.dimantion)));
            let endItems = JSON.parse(JSON.stringify(this.planeCut.slice(this.dimantion)));
            modArr = [...endItems, ...startItems];
        }
        // update plane colors
        for(let i = 0; i < this.planeCut.length; i++){
            this.planeCut[i].colorIndex = modArr[i].colorIndex;
        }

        // reset cut
        this.planeCut = [];
        this.cutRotate = false;
        this.planeCutRotaionDone = 0;
    }

    detectFaceClicked(x, y){
        for(let i = 0; i < this.faces.length; i++){
            if(this.faces[i].isVisible && isPointInPolygon(x, y, this.faces[i].vertices)){
                // click was inside face
                this.selectedFaceId = i;
                this.cubeRotate = false;
                return;
            }
        }
        this.cubeRotate = true;
    }
}