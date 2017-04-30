/**
*
* @author Mikko Tekoniemi 
* 
*/
var player, light;
var offset = new BABYLON.Vector3(0, 12.0, 0);
var TREES = [];
function initWorld(scene) {
    var loader = new BABYLON.AssetsManager(scene);

    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.8);


    light = SpotLight(scene, "light", BABYLON.Vector3.Zero(), Vec3(0, -1, 0), 0.8, 2, 0.5);

    var ground_mat = createTextureMaterial(scene, "tex1", "https://raw.githubusercontent.com/XzekyeX/TSOTDF/master/res/grass.png", Vec2(1.0, 1.0));
    var plane = createPlane(scene, "ground", Vec3(0, 0, 0), Vec2(50, 50), ground_mat);

    var tree_mat = createColorMaterial(scene, "col1", new BABYLON.Color3(0.4, 0.3, 0.1))
    var tree = loadMesh(loader, "Tree", "DeadTree1.obj", Vec3(0, 0, 0), Vec3(1.0, 1.0, 1.0), tree_mat);


    var player_mat = createColorMaterial(scene, "col1", new BABYLON.Color3(0.2, 0.5, 0.8))
    player = loadMesh(loader, "Player", "Dude.obj", Vec3(4, 1.5, -4), Vec3(0.5, 0.5, 0.5), player_mat);

    loader.load();

    var amount = 100;
    tree.then(function (task) {
        for (var i = 0; i < amount; i++) {
            var t = task.clone(task.name);
            t.id = task.name + (TREES.length + 1);
            var pos = getAvailableTreePos(-25, 25);
            t.position = pos;
            TREES.push(t);
            //console.log("new tree has been created! on pos:", t.position);
        }
    });
}

function getAvailableTreePos(min, max) {
    var x = rand(min, max);
    var z = rand(min, max);
    var pos = Vec3(x, 0, z);
    if (!checkTreePos(pos)) {
        console.log("Not Available Pos:", pos);
        return getAvailableTreePos();
    }
    return pos;
}

function checkTreePos(pos) {
    for (var tree in TREES) {
        if (tree.position == pos) return false;
    }
    return true;
}

function updateWorld(scene) {
    player.then(function (task) {
        var speed = 0.1;
        if (isKeyDown(Keys.Q)) task.rotation.y -= speed;
        if (isKeyDown(Keys.E)) task.rotation.y += speed;
        light.position = addVec3(task.position, Vec3(0, 3, 0));
        light.direction.x = Math.sin((task.rotation.y));
        light.direction.z = Math.cos((task.rotation.y));
    });
}
