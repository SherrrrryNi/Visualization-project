var w = 1024;
var h = 512;
var mapimg;
var table;
var Heart;

var clat = 0;
var clon = 0;

var lat = 0;
var lon = 0;

var wlat = 38.89;
var wlon = -100.03;

var zoom = 2.6;


function preload() // code from youtube channel - The Coding Train
{
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-10,56,2.6,0,0/1024x512?html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA#1.05/15.2/-1.4');
  table = loadTable("data/projectdata_new.csv","csv","header");
  Heart = loadImage('data/Heart.png');
}

function mercX(lon){
  lon = radians(lon);
  var a = (256/PI) * pow(2,zoom);
  var b = lon + PI;
  return a*b;
}

function mercY(lat){
  lat = radians(lat);
  var a = (256/PI) * pow(2,zoom);
  var b = tan(PI/4 + lat/2);
  var c = PI - log(b);
  return a*c;
}

function setup() {
  // put setup code here
  createCanvas(w,h);
  countries = table.getColumn("Country Name");
  lat = table.getColumn("CapLat").map(Number);
  lon = table.getColumn("CapLon").map(Number);
  marRate = table.getColumn("Marriage rate").map(Number); //
  y2000 = table.getColumn("2000").map(Number); //2000
  y2005 = table.getColumn("2005").map(Number); //2005
  y2010 = table.getColumn("2010").map(Number); //2010
  y2015 = table.getColumn("2015").map(Number); //2015
  y2019 = table.getColumn("2019").map(Number); //2019
  y2000d = table.getColumn("2000d").map(Number); //2000
  y2005d = table.getColumn("2005d").map(Number); //2005
  y2010d = table.getColumn("2010d").map(Number); //2010
  y2015d = table.getColumn("2015d").map(Number); //2015
  y2019d = table.getColumn("2019d").map(Number); //2019
  marriAge_fe = table.getColumn("marriage_age_female").map(Number); //marriage_age_female
  marriAge_ma = table.getColumn("marriage_age_male").map(Number); //marriage_age_male
  enroll_fe = table.getColumn("enrollment_tertiary_female").map(Number); //enrollment_tertiary_female
  enroll_ma = table.getColumn("enrollment_tertiary_male").map(Number); //enrollment_tertiary_male
  employment_fe = table.getColumn("employment ratio female").map(Number); //employment ratio female
  employment_ma = table.getColumn("employment ratio male").map(Number); //employment ratio male
  income_fe = table.getColumn("GNI per capita(women)").map(Number); //female income
  income_ma = table.getColumn("GNI per capita(men)").map(Number); //male income

  ageDif = table.getColumn("age_difference").map(Number); //age Difference
  incomeDif = table.getColumn("Ratio male to female").map(Number); //income Difference
  employDif = table.getColumn("employment ratio male-female").map(Number); //employment Difference
}
a_d=585
b_d=85
function isMouseOverCircle(x, y, radius){ // from petra
  let d = dist(x+b_d,y+a_d, mouseX-512, mouseY-256);
  if(d <= radius) return true;
  else return false;
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}


function draw() {
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);

  var cx = mercX(clon);
  var cy = mercX(clat);
  // console.log(cx);
  // console.log(cy);
  var x0 = mercX(wlon)-cx;
  var y0 = mercY(wlat)-cy;
  // console.log(mouseX);
  // console.log(mouseY);
  var color1 = color(235, 235, 235);
  var color2 = color('#ED6664');
  setGradient(370, -190, 100, 20, color1, color2, "X");
  textSize(15);
  noStroke();
  fill(250, 250, 250);
  text("Marriage Rate", 420,-200);
  text("0", 370,-150);
  text("7", 470,-150);

  for (var i = 0; i < countries.length; i++){
    circleColor= map(marRate[i],3,7,220,80);
    y2000bar = map(y2000[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i]),0,120);
    y2005bar = map(y2005[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i]),0,120);
    y2010bar = map(y2010[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i]),0,120);
    y2015bar = map(y2015[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i]),0,120);
    y2019bar = map(y2019[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i]),0,120);
    y2000dbar = map(y2000d[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i],y2000d[i],y2005d[i],y2010d[i],y2015d[i],y2019d[i]),0,120);
    y2005dbar = map(y2005d[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i],y2000d[i],y2005d[i],y2010d[i],y2015d[i],y2019d[i]),0,120);
    y2010dbar = map(y2010d[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i],y2000d[i],y2005d[i],y2010d[i],y2015d[i],y2019d[i]),0,120);
    y2015dbar = map(y2015d[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i],y2000d[i],y2005d[i],y2010d[i],y2015d[i],y2019d[i]),0,120);
    y2019dbar = map(y2019d[i],0,max(y2000[i],y2005[i],y2010[i],y2015[i],y2019[i],y2000d[i],y2005d[i],y2010d[i],y2015d[i],y2019d[i]),0,120);
    marriAge_fe_barW = map(marriAge_fe[i],0,max(marriAge_fe[i],marriAge_ma[i]),0,70);
    marriAge_ma_barW = map(marriAge_ma[i],0,max(marriAge_fe[i],marriAge_ma[i]),0,70);
    enroll_fe_barW = map(enroll_fe[i],0,max(enroll_fe[i],enroll_ma[i]),0,70);
    enroll_ma_barW = map(enroll_ma[i],0,max(enroll_fe[i],enroll_ma[i]),0,70);
    employment_fe_barW = map(employment_fe[i],0,max(employment_fe[i],employment_ma[i]),0,70);
    employment_ma_barW = map(employment_ma[i],0,max(employment_fe[i],employment_ma[i]),0,70);
    income_fe_barW = map(income_fe[i],0,max(income_fe[i],income_ma[i]),0,70);
    income_ma_barW = map(income_ma[i],0,max(income_fe[i],income_ma[i]),0,70);
    incomeDif_d = map(incomeDif[i],1,2.5,80,140);
    marriAgeDif_d = map(ageDif[i],0,5,80,140);
    employDif_d = map(employDif[i],1,3,80,140);

    var x = mercX(lon[i])-cx;
    var y = mercY(lat[i])-cy;

    // console.log(countries[i]);
    // console.log(x);
    // console.log(y);

    var circleSize = 10;

    if(isMouseOverCircle(x, y, circleSize)){
      circleSize = 20;
      textAlign(CENTER);
      fill("");
      textSize(12);
      text(countries[i],x+120,y-12); // show country name

      textAlign(LEFT);
      textSize(16);
      text(countries[i]+"'s marriage rate in 2019",-175,-40);
      textSize(42);
      text(marRate[i]+"%",-175,-70);

      for (var j = 0; j < Math.max(0,Math.round(marRate[i])); j++){
          image(Heart,-165+j*35,-17,30,30);
      }

      // display female basic info
      fill('#ED6664');
      textAlign(CENTER);
      textSize(10);
      rect(-325,-208+60,marriAge_fe_barW,10);//age
      text(marriAge_fe[i].toFixed(2), -308 + marriAge_fe_barW,-200+60);
      rect(-325,-178+60,enroll_fe_barW,10);//edu
      text(enroll_fe[i].toFixed(2), -308 + enroll_fe_barW,-170+60);
      rect(-325,-148+60,employment_fe_barW,10);//employ
      text(employment_fe[i].toFixed(2), -308 + employment_fe_barW,-140+60);
      rect(-325,-118+60,income_fe_barW,10);//income
      text(income_fe[i], -308 + income_fe_barW,-110+60);

      // display male basic info
      fill('#A9D0F5');
      rect(-395-marriAge_ma_barW,-208+60,marriAge_ma_barW,10);//age
      text(marriAge_ma[i].toFixed(2), -413 - marriAge_ma_barW,-200+60);
      rect(-395-enroll_ma_barW,-178+60,enroll_ma_barW,10);//edu
      text(enroll_ma[i].toFixed(2), -413 - enroll_ma_barW,-170+60);
      rect(-395-employment_ma_barW,-148+60,employment_ma_barW,10);//employ
      text(employment_ma[i].toFixed(2), -413 - employment_ma_barW,-140+60);
      rect(-395-income_ma_barW,-118+60,income_ma_barW,10);//income
      text(income_ma[i], -413 - income_ma_barW,-110+60);




      // display edu bar
      fill(235,235,235);
      noStroke();
      rect(-460, 200-y2000bar, 20, y2000bar); //pri
      rect(-390, 200-y2005bar, 20, y2005bar); //sec
      rect(-320, 200-y2010bar, 20, y2010bar); //
      rect(-250, 200-y2015bar, 20, y2015bar); //
      rect(-180, 200-y2019bar, 20, y2019bar); //

      fill('#49A399');
      noStroke();
      rect(-430, 200-y2000dbar, 20, y2000dbar); //pri
      rect(-360, 200-y2005dbar, 20, y2005dbar); //sec
      rect(-290, 200-y2010dbar, 20, y2010dbar); //
      rect(-220, 200-y2015dbar, 20, y2015dbar); //
      rect(-150, 200-y2019dbar, 20, y2019dbar); //

      // dis paly edu num
      textAlign(CENTER);
      textSize(14);
      fill(250,250,250);
      text(y2000[i].toFixed(2), -450,200-y2000bar-4);
      text(y2005[i].toFixed(2), -380,200-y2005bar-4);
      text(y2010[i].toFixed(2), -310,200-y2010bar-4);
      text(y2015[i].toFixed(2), -240,200-y2015bar-4);
      text(y2019[i].toFixed(2), -170,200-y2019bar-4);

      fill('#49A399');
      text(y2000d[i].toFixed(2), -420,200-y2000dbar-4);
      text(y2005d[i].toFixed(2), -350,200-y2005dbar-4);
      text(y2010d[i].toFixed(2), -280,200-y2010dbar-4);
      text(y2015d[i].toFixed(2), -210,200-y2015dbar-4);
      text(y2019d[i].toFixed(2), -140,200-y2019dbar-4);

      fill(250,250,250);
      rect(-100, 100, 10, 10); //
      fill('#49A399');
      rect(-100, 120, 10, 10); //
      fill(250,250,250);

      textAlign(LEFT);
      textSize(12);
      text('Marraige rate', -85,109);
      fill('#49A399');
      text('Divorce rate', -85,129);

    }
    else{
      circleSize = 12;
      //stroke('rgba(232,232,232,0.25)');
    }

    //line(x0,y0,x,y);  // line between capitals and watshington
    fill(235,circleColor,circleColor);
    ellipse(x+b_d,y+a_d,circleSize,circleSize);   // captital circles
  }

  // watshington circles
  // fill("#7adf80");
  // ellipse(x0,y0,20,20);

  {

    stroke(255, 255, 255);
    line(-480, -38, -250, -38) //x

    // X axis lable
    fill('#F5A9F2');
    noStroke();
    textSize (18);
    text('👩', -280,-10);

    fill('#A9D0F5');
    noStroke();
    textSize (18);
    text('👨', -450,-10);

    fill(250, 250, 250);
    noStroke();
    textSize (10);
    textAlign(CENTER);
    text('Income €', -360,-50);
    text('ratio %', -360,-73);
    text('Employment', -360,-83);
    text('education%', -360,-103);
    text('Tertiary', -360,-113);
    text('Marriage age', -360,-140);


  }


{
  textSize (16); // basic info
    fill(250, 250, 250);
    text('Gender differences in 2019',-360,-165);

  textSize (16); // edu bar
  fill(250, 250, 250);
  text('Marriage & Divorce Rate Changes',-310,50);

  stroke(250, 250, 250);
  line(-480, 200, -120, 200) //x
  line(-480, 200, -480, 70) //y
  stroke('rgba(255,255,255,0.25)');
  line(-480, 80, -150, 80) //100% high
  line(-480, 110, -150, 110) //75% high
  line(-480, 140, -150, 140) //50% high
  line(-480, 170, -150, 170) //25% high

  // X axis lable
  fill(250, 250, 250);
  noStroke();
  textSize (12);
  textAlign(CENTER);
  text('2000', -435,215);
  text('2005', -365,215);
  text('2010', -295,215);
  text('2015', -225,215);
  text('2019', -155,215);
}


}
