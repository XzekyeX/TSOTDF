/**
*
* @author Mikko Tekoniemi 
* 
*/
var width = 640;
var height = 480;
function init() {
    var game = $("<canvas width=\"" + width + "\" height=\"" + height + "\" />");
    $("#game").append(game);
    var engine = new BABYLON.Engine(game[0], true);
    initInput();
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
            updateInput();
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

var camera, light, speed = 0.2;
function update(scene) {
    if (isKeyDown(65)) { // A
        camera.position.x -= speed;
    }
    if (isKeyDown(68)) { // D
        camera.position.x += speed;
    }
    if (isKeyDown(87)) { // W
        camera.position.z += speed;
    }
    if (isKeyDown(83)) { // S
        camera.position.z -= speed;
    }
    if (isKeyDown(32)) { // Space
        camera.position.y += speed;
    }
    if (isKeyDown(16)) { // Shift
        camera.position.y -= speed;
    }
}

function createScene(canvas, engine) {

    var scene = new BABYLON.Scene(engine);
    var loader = new BABYLON.AssetsManager(scene);

    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.8);

    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.speed = 0.2;

    light = createLight(scene, "light", camera.position, camera.rotation);

    var mat = createTextureMaterial(scene, "tex1", "https://raw.githubusercontent.com/XzekyeX/TSOTDF/master/res/grass.png", Vec2(1.0, 1.0));

    var plane = createPlane(scene, "ground", Vec3(0, 0, 0), Vec2(10, 10), mat);

    loadMesh(loader, "Tree1", "DeadTree1.obj", new BABYLON.Vector3(0, 0, 0), mat);
    loadMesh(loader, "Tree2", "DeadTree2.obj", new BABYLON.Vector3(0, 0, -2), mat);


    loader.load();
    return scene;
}

function Vec3(x, y, z) {
    return new BABYLON.Vector3(x, y, z);
}

function Vec2(x, y) {
    return new BABYLON.Vector2(x, y);
}

function createTextureMaterial(scene, name, file, scale) {
    var mat = new BABYLON.StandardMaterial(name, scene);
    mat.diffuseTexture = new BABYLON.Texture(file, scene);
    mat.diffuseTexture.uScale = scale.x;
    mat.diffuseTexture.vScale = scale.y;
    return mat;
}

function createColorMaterial(scene, name, color) {
    var mat = new BABYLON.StandardMaterial(name, scene);
    mat.diffuseColor = color;
    return mat;
}

function createPlane(scene, name, pos, size, mat) {
    var plane = BABYLON.Mesh.CreateGround(name, size.x, size.y, 1, scene, false);
    plane.position = pos;
    plane.material = mat;
    return plane;
}

function createLight(scene, name, pos, dir) {
    var light = new BABYLON.DirectionalLight(name, dir, scene);
    light.position = pos;
    return light;
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
