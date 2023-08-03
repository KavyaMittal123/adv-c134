status="";
object=[];
alarm="";


function setup(){
    canvas=createCanvas(420,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_dc=ml5.objectDetector('cocossd', modelLoaded );
    document.getElementById("status").innerHTML="Status= Detecting Object";
}

function modelLoaded(){
    console.log("Model issssssss loaded");
    status=true;
}

function gotResult(error,result){
    if (error){
        console.log(error);
    }
    else{
        console.log(result);
        object=result;

    }
}

function preload(){
    alarm=loadSound("alarm.mp3")
}
function draw(){
    image(video,0,0,420,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        object_dc.detect(video,gotResult);
        for (var i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status = Object is Detected";
            document.getElementById("no.ofobj").innerHTML="No. of objects = "+object.length;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            polygon(object[i].x,object[i].y,175,7);
            if(object[i].label=="person"){
                document.getElementById("status").innerHTML="Baby found";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML="Baby not found";
                alarm.play();
            }
        }
        if(object.length==0){
            document.getElementById("status").innerHTML="Baby not found";
            alarm.play();
       }
       
    }
}

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

