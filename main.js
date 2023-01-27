objects = [];
video = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting objects";
}
function modelLoaded(){
    console.log("model loaded");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
    objectDetector.detect(video, gotResult);
    

    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Objects detected";
        document.getElementById("number-of-objects").innerHTML = "Amount of objects detected - "+objects.length;

        fill("#194753");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#194753");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

}}

