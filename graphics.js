// ------- DECLARE CONSTANTS
const viewDegre = 75;
const aspect = window.innerWidth / window.innerHeight;
const drawDistance = 100;
const meshCoordinates = [
    new THREE.Vector3(-3, -2, 2),  // 0
    new THREE.Vector3(1, -2, 2),  // 1
    new THREE.Vector3(-1, 2, 2),  // 2
    new THREE.Vector3(3, 2, 2),  // 3

    new THREE.Vector3(-3, -2, -2),  // 4
    new THREE.Vector3(1, -2, -2),  // 5
    new THREE.Vector3(-1, 2, -2),  // 6
    new THREE.Vector3(3, 2, -2),  // 7
]
// ------- DECLARE VARIABLES
var meshColor = 0xf08000;
var dy = 0.00;
var dx = 0.00;
// ----------------------------------- INIT SCENE
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x282c34);
// ----------------------------------- INIT CAMERA
var camera = new THREE.PerspectiveCamera(viewDegre, aspect, 0.1, drawDistance);
camera.position.z = 10;
// ----------------------------------- RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);
// LIGHTING
const light = new THREE.SpotLight(0xeeeece, 1);
light.position.set(250, 250, 500);
scene.add(light);

// CREATE MATERIAL FOR 3D OBJECT 
var material = new THREE.MeshStandardMaterial({
    color: meshColor,
    flatShading: true,
    emissive: 0x111111,
    specular: 0xfffff,
    metalness: 0.4,
    roughness: 0.55,
});
// creating axis lines
var points = [];
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(drawDistance, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, drawDistance, 0));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, 0, drawDistance));
var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
var line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x505050 }));
scene.add(line);

// -- CREATE MAIN SHAPE
var shapeGeometry = build3DRectGeometry(meshCoordinates);
var mesh = new THREE.Mesh(shapeGeometry, material);
scene.add(mesh);

var animate = function () {
    requestAnimationFrame(animate);

    mesh.rotation.x += dx;
    mesh.rotation.y += dy;

    line.rotation.x += dx;
    line.rotation.y += dy;

    renderer.render(scene, camera);
};

animate();

function build3DRectGeometry(coordinates) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(...coordinates);
    geometry.faces.push(
        // front
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 1, 3),
        // right
        new THREE.Face3(1, 7, 3),
        new THREE.Face3(1, 5, 7),
        // back
        new THREE.Face3(5, 6, 7),
        new THREE.Face3(5, 4, 6),
        // left
        new THREE.Face3(4, 2, 6),
        new THREE.Face3(4, 0, 2),
        // top
        new THREE.Face3(2, 7, 6),
        new THREE.Face3(2, 3, 7),
        // bottom
        new THREE.Face3(4, 1, 0),
        new THREE.Face3(4, 5, 1),
    );
    geometry.computeVertexNormals();
    return geometry;
}

function rebuildMesh(coordinates) {
    mesh.geometry = build3DRectGeometry(coordinates)
}

