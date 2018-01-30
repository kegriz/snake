var t=[];
var dirOY=-1;
var dirOX=0;
var score=0;
var time=1000;
var jump;

window.addEventListener("keydown", function(evt) {
    if (evt.key == "ArrowUp") {
      direction("up");
    } else if (evt.key == "ArrowDown") {
      direction("down");
    } else if (evt.key == "ArrowRight") {
      direction("right");
    } else if (evt.key == "ArrowLeft") {
      direction("left");
    }
}, true);

function setTime(t) {
    time = t;
}

function fail() {
    alert("you lose")
}

function point() {
    var x=Math.round(Math.random()*8)
    var y= Math.round(Math.random()*8);
    if ( t[y][x] == 0 ) {
        t[y][x]=-1;
    } else {
        point();
    }
}

function direction(d) {
    switch(d) {
        case "up":
            if(dirOY!=1) {dirOY=-1};
            dirOX=0;
            break;
        case "down":
            if(dirOY!=-1) {dirOY=1};
            dirOX=0;
            break;
        case "left":
            dirOY=0;
            if(dirOX!=1) {dirOX=-1};
            break;
        case "right":
            dirOY=0;
            if(dirOX!=-1) {dirOX=1};
            break;
    }
}

function move() {
    for(y=0;y<=8;y++) {
        for(x=0;x<=8;x++) {
            if(t[y][x]==1) {
                t[y][x]=2;
                if((dirOY==-1)&&(y==0)) {
                    if(t[8][x]==-1){
                        score++;
                        point();
                    } else if(t[8][x]>2) {
                        fail();
                        break;
                    }
                    t[8][x]=1;
                    show();
                    break;
                } else if((dirOY==1)&&(y==8)) {
                    if(t[0][x]==-1) {
                        score++;
                        point();
                    } else if(t[0][x]>2) {
                        fail();
                        break;
                    }
                    t[0][x]=1;
                    show();
                    break;
                } else if((dirOX==1)&&(x==8)) {
                    if(t[y][0]==-1) {
                        score++;
                        point();
                    } else if(t[y][0]>2) {
                        fail();
                        break;
                    }
                    t[y][0]=1;
                    show();
                    break;
                } else if((dirOX==-1)&&(x==0)) {
                    if(t[y][8]==-1) {
                        score++;
                        point();
                    } else if(t[y][8]>2) {
                        fail();
                        break;
                    }
                    t[y][8]=1;
                    show();
                    break;
                } else {
                    if(t[y+dirOY][x+dirOX]==-1) {
                        score++;
                        point();
                    } else if(t[y+dirOY][x+dirOX]>2) {
                        fail();
                        break;
                    }
                    t[y+dirOY][x+dirOX]=1;
                    show();
                    break;
                }
            }
        }
    }
}

function show() {
    var board="";
    board+="<table border='0' cellpadding='0' cellspacing='0'>";
    for(y=0;y<=8;y++) {
        board+="<tr>"
        for(x=0;x<=8;x++) {
            board+="<td>";
            if(t[y][x]>=2) {
                t[y][x]++;
            }
            if(t[y][x]>=score+6) {
                t[y][x]=0;
            }
            if(t[y][x]==1) {
                board+="<div class='head'>";
            } else if(t[y][x]>=2) {
                board+="<div class='tail'>";
            } else if(t[y][x]==-1) {
                board+="<div class='score'>";
            } else {
                board+="<div class='field'>";
            }
            board+="</div></td>";
        }
        board+="</tr>";
    }
    board+="</table>"

    document.getElementById("board").innerHTML=board;
    document.getElementById("score").innerHTML="score = "+score;

    jump = setTimeout(function() { move(); }, time);
}

function start() {
    t=[];
    time=1000;
    direction("up");
    score=0;
    clearTimeout(jump);
    for(y=0;y<=8;y++) {
        t[y]=[];
        for(x=0;x<=8;x++) {
            t[y][x]=0;
        };
    };
    t[4][4]=1;
    t[5][4]=2;
    point();
    show();
}
