song="";

scoreLeftWrist=0;
scoreRightWrist=0;

left_wristX=0;
left_wristY=0;

right_wristX=0;
right_wristY=0;

function preload(){
song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialized!');
}

function gotPoses(results){
    if(results.length > 0){
console.log(results);
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

left_wristX=results[0].pose.leftWrist.x;
left_wristY=results[0].pose.leftWrist.y;
console.log("left_wristX = " + left_wristX + " left_wristY = " + left_wristY);

right_wristX=results[0].pose.rightWrist.x;
right_wristY=results[0].pose.rightWrist.y;
console.log("right_wristX = " + right_wristX + " right_wristY = " + right_wristY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("FF0000");

    if(scoreRightWrist > 0.2){

    

    circle(right_wristX,right_wristY,20);

    if(right_wristY > 0 && right_wristY <= 100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";

        song.rate(0.5);
    }

    else if(right_wristY > 100 && right_wristY <= 200){
        document.getElementById("speed").innerHTML="Speed = 1x";

        song.rate(1);
    }

    else if(right_wristY > 200 && right_wristY <= 300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";

        song.rate(1.5);
    }

    else if(right_wristY > 300 && right_wristY <= 400){
        document.getElementById("speed").innerHTML="Speed = 2x";

        song.rate(2);
    }

    else if(right_wristY > 400 && right_wristY <= 500){
        document.getElementById("speed").innerHTML="Speed = 2.5x";

        song.rate(2.5);
    }
}


    if(scoreLeftWrist>0.2){

    
    circle(left_wristX,left_wristY,20);

    InNumberLeft_wristY = Number(left_wristY);
    removeDecimal = floor(InNumberLeft_wristY);
    volume = removeDecimal/500;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();

    song.setVolume(1);

    song.rate(1);
}

