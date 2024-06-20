class Cube{
    constructor(){
        this.cubieSize = 100;
        this.cubies = [];
        this.xAngle = -35;
        this.yAngle = 45;
        //this.zAngle = 0;

        //initiate cube
        let index = 0;
        for(let x = -1; x<=1; x++){
            for(let y = -1; y<=1; y++){
                for(let z = -1; z<=1; z++){
                    this.cubies[index] = new Cubie(x, y, z, index);
                    index++;
                }
            }
        }
    }
}