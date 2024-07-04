class Cube{
    constructor(dimantion, cubieSize){
        this.dimantion = dimantion;
        this.cubieSize = cubieSize;
        this.faces = [];
        this.colors = [
            color(255, 255, 255),   // 0 top white
            color(255, 0, 0),       // 1 front red
            color(0, 0, 255),       // 2 right blue
            color(255, 150, 0),     // 3 back orange
            color(0, 255, 0),       // 4 left green
            color(255, 255, 0),     // 5 bottom yellow
            color(51)               // test
        ];
        this.normalX = createVector(1, 0, 0);
        this.normalY = createVector(0, -1, 0);
        this.normalZ = createVector(0, 0, 1);
        
        this.cubeRotate = false;
        // this.cutRotate = false;
        this.planeCut = [];
        this.planeCutRotationAxis = createVector(0, 0, 0);
        this.planeCutRotaionMagnitude = radians(5);
        this.planeCutRotaionDone = 0;
        this.faceCutType = '';

        this.shuffle = [];
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
                        f.rotateFace(0, 180, 0);
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
        let sortingTable = {'front' : 1, 'top' : 2, 'right' : 3, 'back' : 4, 'bottom': 5, 'left' : 6};
        this.faces.sort((a, b) => {
            if(a.type != b.type){
                return sortingTable[a.type] - sortingTable[b.type];
            }else{
                if(a.hierarchy.z === b.hierarchy.z){
                    if(a.hierarchy.x == b.hierarchy.x){
                        return (a.type == 'right' || a.type == 'front') ? a.hierarchy.y - b.hierarchy.y : b.hierarchy.y - a.hierarchy.y;
                    }else{
                        return (a.type == 'top' || a.type == 'front') ? a.hierarchy.x - b.hierarchy.x : b.hierarchy.x - a.hierarchy.x;
                    }
                }else{
                    return (a.type == 'top' || a.type == 'right') ? a.hierarchy.z - b.hierarchy.z : b.hierarchy.z - a.hierarchy.z;
                }
            }
        });
    }

    render(){
        if(this.planeCut.length > 0){
            this.rotateCutPlane(this.planeCutRotaionMagnitude);
            this.planeCutRotaionDone += this.planeCutRotaionMagnitude;

            if(Math.abs(degrees(this.planeCutRotaionDone)) >= 89){
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

    createPlaneCut(axis, dir){
        const selectedFace = this.faces[this.selectedFaceId];
        const faceHierarchy = selectedFace.hierarchy;
        this.planeCut = this.faces.filter(f => f.hierarchy[axis] === faceHierarchy[axis]);
        this.planeCutRotaionMagnitude *= dir;
        
        if(axis === 'x'){
            this.planeCutRotationAxis = this.normalX;
            if(selectedFace.hierarchy[axis] === 0){
                this.faceCutType = 'left';
            }else if(selectedFace.hierarchy[axis] === this.dimantion - 1){
                this.faceCutType = 'right';
            }else{
                this.faceCutType = '';
            }
        }

        if(axis === 'y'){
            this.planeCutRotationAxis = this.normalY;
            if(selectedFace.hierarchy[axis] === 0){
                this.faceCutType = 'top';
            }else if(selectedFace.hierarchy[axis] === this.dimantion - 1){
                this.faceCutType = 'bottom';
            }else{
                this.faceCutType = '';
            }
        }

        if(axis === 'z'){
            this.planeCutRotationAxis = this.normalZ;
            if(selectedFace.hierarchy[axis] === 0){
                this.faceCutType = 'back';
            }else if(selectedFace.hierarchy[axis] === this.dimantion - 1){
                this.faceCutType = 'front';
            }else{
                this.faceCutType = '';
            }
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
            //extract face plane
            let faceCut = this.planeCut.filter(f => f.type === this.faceCutType);
            //convert plane array to matrix
            let faceMatrix = [];
            let index = 0;
            for(let r = 0; r < this.dimantion; r++){
                faceMatrix[r] = [];
                for(let c = 0; c < this.dimantion; c++){
                    faceMatrix[r][c] = faceCut[index].colorIndex;
                    index++;
                }
            }
            // rotate matrix
            faceMatrix = this.planeCutRotaionMagnitude <= 0 && this.planeCutRotationAxis != this.normalZ || this.planeCutRotaionMagnitude >= 0 && this.planeCutRotationAxis == this.normalZ ? faceMatrix[0].map((val, index) => faceMatrix.map(row => row[index]).reverse()) : faceMatrix[0].map((val, index) => faceMatrix.map(row => row[row.length-1-index]));

            // update colors
            index = 0;
            for(let r = 0; r < this.dimantion; r++){
                for(let c = 0; c < this.dimantion; c++){
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

        if((this.planeCutRotaionMagnitude <= 0 && this.planeCutRotationAxis != this.normalY) || (this.planeCutRotaionMagnitude > 0 && this.planeCutRotationAxis == this.normalY)){
            let startItems = JSON.parse(JSON.stringify(this.planeCut.slice(0, -this.dimantion)));
            let endItems = JSON.parse(JSON.stringify(this.planeCut.slice(-this.dimantion)));
            modArr = [...endItems, ...startItems];
        }else{
            let startItems = JSON.parse(JSON.stringify(this.planeCut.slice(0, this.dimantion)));
            let endItems = JSON.parse(JSON.stringify(this.planeCut.slice(this.dimantion)));
            modArr = [...endItems, ...startItems];
        }

        
        let faceIndex = 0;
        for(let i = 0; i < this.planeCut.length; i++){
            if(faceIndex == 0 && this.normalY == this.planeCutRotationAxis){
                // whene rotating on Y axis we need to flip left and right face cubies order
                let rev = modArr.splice(i, this.dimantion);
                modArr.splice(i, 0, ...rev.reverse());
                faceIndex = this.dimantion;
            }
            this.planeCut[i].colorIndex = modArr[i].colorIndex;
            faceIndex--;
        }

        // reset cut
        this.planeCut = [];
        // this.cutRotate = false;
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