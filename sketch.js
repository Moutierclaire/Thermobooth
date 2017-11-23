var webcam;
var temperature;
var b = p5.board('/dev/cu.usbmodem1411', 'arduino');
var p = b.pin(0, 'analog', 'INPUT');
var rgb = b.pin({r: 9, g: 10, b: 11}, 'RGBLED');
var cnv ; 
var minimum = 530;
var maximum = 540; 
// changer la valeur 515-530 --> valeurs plus rapprochées, plus rapide
//515 550


p.read(function(val){
  console.log(val);
  temperature = val;
  changerFlou(temperature);
});



function setup() {

  cnv = createCanvas(1280, 720);
  colorMode(HSB, 360, 100, 100,100);
  c = color(186,86,48);
  // c = color(7, 250, 255); ORANGE
  //c = color(0, 255, 255); ROUGE


  rgb.write(c);


  var constraints = {
    video: {
      
      mandatory: {

        minWidth: 1280,
        minHeight: 720,
      },
      optional: [
        { maxFrameRate: 30 }
      ]
    },
  //  audio: true
  };
  webcam = createCapture(constraints);

  noStroke();
}


function draw() { 

  var teinte = map_range_limit(temperature, minimum, maximum, 186, 359);


  c = color(teinte,86,48);
  rgb.write(c);

	image(webcam, 0, 0);
  var opacity = map_range_limit(temperature, minimum, maximum, 0, 60);

  fill(31, 77, 92, opacity);
  rect(0,0,1280,720);
  //color (250,250,30);
}


  function mouseClicked() {
    saveCanvas(cnv,'img1.jpg');
  }



function changerFlou(val) {
  var flou = map_range(val, minimum, maximum, 5, 0);



  $(function(){
    $('canvas').css({
      'filter':'blur('+flou+'px)'
    });
  })
}



function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



function map_range_limit(value, low1, high1, low2, high2) {
  if (value <= low1) return low2;
  if (value >= high1) return high2;
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}





