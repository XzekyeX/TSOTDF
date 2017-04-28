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
          //  console.log("ups[" + ups + "]");
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

function update(scene) {

}

function createScene(canvas, engine) {

    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0.1, 0.2, 1.0);

    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.speed = 0.2;
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    var loader = new BABYLON.AssetsManager(scene);
    var tree = loader.addMeshTask("DeadTree1", "", "res/", "DeadTree1.obj");
    tree.onSuccess = function (task) {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
    }
    loader.load();

    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount
    light.intensity = .5;

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Leave this function
    return scene;
}
