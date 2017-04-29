var player;
var offset = new BABYLON.Vector3(0, 8.0, -12.5);
function updateWorld(scene) {
    player.then(function (task) {
        var v = GetAxis("Vertical");
        var h = GetAxis("Horizontal");
        var speed = 0.2;
        task.position.z += v * speed;
        task.position.x += h * speed;
        // console.log(task.position);
        camera.setTarget(task.position);
        var target = merge(task.position, offset);
        console.log(target);
        camera.position = BABYLON.Vector3.Lerp(camera.position, target, 0.125);
    });
}

function merge(a, b) {
    return new BABYLON.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
}

function initWorld(scene) {
    var loader = new BABYLON.AssetsManager(scene);

    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.8);


    var light = HemisphericLight(scene, "light", camera.position, 0.7);

    var mat = createTextureMaterial(scene, "tex1", "https://raw.githubusercontent.com/XzekyeX/TSOTDF/master/res/grass.png", Vec2(1.0, 1.0));

    var plane = createPlane(scene, "ground", Vec3(0, 0, 0), Vec2(10, 10), mat);

    loadMesh(loader, "Tree1", "DeadTree1.obj", Vec3(0, 0, 0), Vec3(1.0, 1.0, 1.0), mat);
    loadMesh(loader, "Tree2", "DeadTree2.obj", Vec3(4, 0, 0), Vec3(1.0, 1.0, 1.0), mat);
    player = loadMesh(loader, "Player", "Dude.obj", Vec3(4, 0, -4), Vec3(1.0, 1.0, 1.0), mat);



    loader.load();
}