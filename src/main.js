/**
*
* @author Mikko Tekoniemi 
* 
*/
var width = 640;
var height = 480;
var blue = 1.0;
var dir = 0;
function init() {
    var game = $("<canvas width=\"" + width + "\" height=\"" + height + "\" />");
    $("#game").append(game);
    var engine = new BABYLON.Engine(game[0], true);
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        width = game[0].width = window.innerWidth;
        height = game[0].height = window.innerHeight;
        engine.resize();
    }
    resizeCanvas();
    var scene = createScene(game[0], engine);
    var delta = 0;
    var ns = 1000000000 / 60.0;
    var lastTime = window.performance.now();
    var timer = getCurrentTimeMills();
    var ups = 0;
    engine.runRenderLoop(function () {
        var now = window.performance.now();
        delta += (now - lastTime) * 0.06;
        lastTime = now;
        while (delta >= 1) {
            delta--;
            update(scene);
            ups++;
        }
        scene.render();
        if ((getCurrentTimeMills() - timer) >= 1000) {
            timer += 1000;
            // console.log("ups[" + ups + "]");
            ups = 0;
        }
    });
}

function getCurrentTimeMills() {
    return (new Date()).getTime();
}

//value min max
function clamp(value, min, max) {
    return value >= max ? max : value <= min ? min : value;
}
var camera, light;
function update(scene) {
    // var dude = scene.getMeshByUniqueID(0);
    // console.log("Dude:",dude);
    light.position.x = camera.position.x;
    light.position.y = camera.position.y + 10
    light.position.z = camera.position.z;
    // light.rotation = camera.rotation;

}

function createScene(canvas, engine) {

    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0.0, 0.0, 0.0);

    // This creates and positions a free camera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.speed = 0.2;
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);


        // Ground
    var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.specularColor = BABYLON.Color3.Black();
    ground.material = groundMaterial;
	
    // Meshes and Materials
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("res/grass.png", scene);
    materialPlane.diffuseTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
    materialPlane.diffuseTexture.vScale = 5.0;//Repeat 5 times on the Horizontal Axes
    materialPlane.backFaceCulling = false;//Allways show the front and the back of an element
	ground.material=materialPlane;

    var loader = new BABYLON.AssetsManager(scene);
    var mat = new BABYLON.StandardMaterial("tex1", scene);
    mat.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.1);

    loadMesh(loader, "Tree1", "DeadTree1.obj", new BABYLON.Vector3(-5, 0, -5), mat);
    loadMesh(loader, "Tree2", "DeadTree2.obj", new BABYLON.Vector3(0, 0, -10), mat);
    loadMesh(loader, "Dude", "Dude.obj", new BABYLON.Vector3(0, 0, 0));

    loader.load();

    // This creates a light, aiming 0,1,0 - to the sky.
    light = new BABYLON.SpotLight("", new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero(), 0, 0, scene);
    light.name = "My Slowly and Discretely Constructed Spot Light"
    light.position = new BABYLON.Vector3(0, 30, -10);
    light.direction = new BABYLON.Vector3(0, -1, 0);
    light.angle = 0.8;
    light.exponent = 2;
    light.intensity = 0.6;
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.setEnabled(1);

    return scene;
}

function Vec3(x, y, z) {
    return new BABYLON.Vector3(x, y, z);
}

function loadMesh(loader, name, obj, pos, mat) {
    var mt = loader.addMeshTask(name, "", "https://raw.githubusercontent.com/XzekyeX/TSOTDF/master/res/", obj);
    mt.onSuccess = function (task) {
        var mesh = task.loadedMeshes[0];
        if (pos != null) mesh.position = pos;
        if (mat != null) mesh.material = mat;
    }
    mt.onError = function (task) {
        console.log("Error:", task);
    }
    return mt;
}

function read(arr, index) {
    return arr != null && Object.keys(arr).length > index ? arr[index] : null;
}
