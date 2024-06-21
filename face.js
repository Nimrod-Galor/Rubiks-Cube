class Face{
    constructor(normal, colorIndex, vertices){
        this.normal = normal;
        this.colorIndex = colorIndex;
        this.vertices = vertices;
    }
    
    render(){
        push();
        fill(this.color);
        stroke(2);
        plane(cube.cubieSize, cube.cubieSize);
        pop();
    }
}