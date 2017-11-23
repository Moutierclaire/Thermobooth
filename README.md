# Thermobooth

Project directed by Claire Moutier, for the "moments of delight" of the event
interaction 18.

![](/assets/8.jpg)



## The interactive device
Thermobooth is a project that allows you to heat more or less an object using your body heat (breath, friction ...) to act on your picture. At first, the camera is blurred. As the object heats up, the image becomes deopacified and changes to warmer tones. The object contains an RGB LED as well as a temperature sensor so that the color of the light changes according to the heat produced. You must put yourself in front of the object and warm it up. 
Smile and click when the filter is right for you.
    
_**Note**_ : Here is archived only the digital/technical part of the device. It's up to you to design the object and take into account the projection space. ;)

Now, it's your turn !


## Electronic equipment required
* 1 arduino board (tested with Uno) and his USB cable
* 1 shield (grove moduls)
* 1 big wire to connect shield with the temperature sensor 
* 1 temperature sensor
* 1 breadboard
* 4 connector wires
* 3 resistors 220Ω
* 1 RGB L.E.D

## Configuration and software required
* A powerful computer (tested with Macbook Pro 8GB RAM)
* Javascript
* P5.js
* Arduino (version 1.8.4)
* A videoprojector (or screen)
* An HDMI cable


## Capture the heat 

This whole project is based on the production of heat to create the interaction. In our device, the first thing to do is to capture the heat. You will need a temperature sensor. After doing the arduino editing (to see at the end of this tutorial), we will use variables to connect the arduino data to our code.

```javascript
var b = p5.board('/dev/cu.usbmodem1411', 'arduino');
var p = b.pin(0, 'analog', 'INPUT');
var rgb = b.pin({r: 9, g: 10, b: 11}, 'RGBLED');
```

Then, we use the console.log function to know the real-time heat that the arduino temperature sensor receives.

! [ ] (/assets/consolelog.png) 

This is what will allow us to determine a minimum and a maximum temperature. We will create three variables: a temperature variable, a minimum variable and a maximum variable. They will be named like this (you can name them differently if you want).
These variables and values will be recalled to act on the picture.

```javascript
var temperature;
var minimum = 530;
var maximum = 540; 
```
_**Note**_ : Values 530 and 540 refer to a temperature range. They can be modified.


## 2- Impact of heat on the picture

The temperature impact on the picture. At first, the filter will be blurred. It will become in yellow tones when the object is warmed up. First you need to make a webcam variable to have access to the camera and a hue variable.


**> To make a blur picture**, we use the function 'blur' filter like this :

```javascript
$(function(){
    $('canvas').css({
      'filter':'blur('+flou+'px)'
    });
  })
}
```

In order that the blur varies according to the temperature, we use the function 'map_range'

```javascript
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
```

```javascript
  function changerFlou(val) {
  var flou = map_range(val, minimum, maximum, 5, 0);
```

**> To make a filter in yellow tones,** we make a rectangle with the same size as our Canvas, we use the fill function by adding our colors R, G, B + opacity (optional)

```javascript
  image(webcam, 0, 0);
  rect(0,0,1280,720);
  fill(31, 77, 92, opacity);
  var teinte = map_range_limit(temperature, minimum, maximum, 186, 359); 
 ```
 
 ```javascript
  var opacity = map_range_limit(temperature, minimum, maximum, 0, 60);
```
_**Note :**_ With the map_range_limit function, we say we want a 60% opacity filter when the maximum heat is reached.

## 3 - Link the temperature to the color of the LED

When the temperature sensor warms up, the RGB LED changes color. It varies from blue to red.

**In draw :**

```javascript
  c = color(teinte,86,48);
  rgb.write(c);
 ```
_**Note :**_ 86 is the value of blue, 48 in the value of red.

We also use the 'map_range_limit' function. The piece of code below indicates that the LED will change color with a spectrum from blue to red depending on the minimum or maximum temperature.

```javascript
function map_range_limit(value, low1, high1, low2, high2) {
  if (value <= low1) return low2;
  if (value >= high1) return high2;
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
 ```
 
 ### PHOTO & VIDEOS
 
 
## 4 - Take the picture

To make this project, we created a variable 'Canvas' that we placed at the beginning, this variable is recalled in the setup but also in the draw part. This is what will interest us here.
Indeed, we are already at the last stage : you have to click to take a picture of yourself. For this, we use the 'Mouseclicked' function. This function will allow you to take and save a picture with a simple click.

```javascript
 function mouseClicked() {
    saveCanvas(cnv,'img1.jpg');
  }
 ```
 
 ## Arduino editing
 
 ### PHOTO
 
 ## One more things
Congratulations, it's finish ! If you reuse this DIY, don't hesitate to share it :)



  



