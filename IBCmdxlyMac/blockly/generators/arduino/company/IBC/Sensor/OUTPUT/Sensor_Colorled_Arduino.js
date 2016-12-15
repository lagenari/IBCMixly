'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


function hexToRgb(hex) {
  if ( hex.charAt(0) == '#' ) {
    hex = hex.substr(1);
  }
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return r + "," + g + "," + b;
}

Blockly.Arduino.ColorledInit = function() {

  var LEDNumber = this.getFieldValue('LEDNumber');
  var LEDPin = this.getFieldValue('LEDPin');

  Blockly.Arduino.definitions_['define_Adafruit_NeoPixel'] = '#include<colorLed.h>';
  Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel ledStrip = Adafruit_NeoPixel('+LEDNumber+', '+LEDPin+', NEO_GRB + NEO_KHZ800);';

  Blockly.Arduino.setups_['setup_stripBegin'] = 'ledStrip.setBrightness(255);';
  Blockly.Arduino.setups_['setup_SCoop'] = 'mySCoop.start();';

  var code='yield();\n';
  return code;
};

Blockly.Arduino.ColorledLight = function() {

  var Light = Blockly.Arduino.valueToCode(this, 'Light', Blockly.Arduino.ORDER_ATOMIC)

  var code='ledStrip.setBrightness('+Light+');\n';
  return code;
};

Blockly.Arduino.ColorRainbow = function() {

  var code='setAllMode(MODE_RAINBOW, 0);\n';
  return code;
};

Blockly.Arduino.ColorledSingle = function() {

  var colorRGB = this.getFieldValue('colorRGB');

  var code='setAllLed('+hexToRgb(colorRGB)+');\n';
  code+='setAllMode(MODE_SET, 0);\n';
  return code;
};

Blockly.Arduino.ColorledBreath = function() {

  var colorRGB = this.getFieldValue('colorRGB');

  var code='setAllLed('+hexToRgb(colorRGB)+');\n';
  code+='setAllMode(MODE_BREATH, 0);\n';
  return code;
};

Blockly.Arduino.ColorledBlink = function() {

  var colorRGB = this.getFieldValue('colorRGB');
  var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);

  var code='setAllLed('+hexToRgb(colorRGB)+');\n';
  code+='setAllMode(MODE_BLINK, '+time+');\n';
  return code;
};
Blockly.Arduino.ColorledblinkIndex = function() {

  var colorRGB = this.getFieldValue('colorRGB');
  var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
  var index = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC);

  var code='setAllLed('+hexToRgb(colorRGB)+');\n';
  code+='setAllMode(MODE_BLINK, '+time+');\n';
  code+='setAllCount('+index+');\n';
  return code;
};

Blockly.Arduino.IndexColorRainbow = function() {

  var indexled = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC);
  
  var code='setSingleMode('+indexled+'-1, MODE_RAINBOW, 0);\n';
  return code;
};

Blockly.Arduino.IndexColorledSingle = function() {

  var colorRGB = this.getFieldValue('colorRGB');
  var indexled = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC);
  
  var code='setSingleLed('+indexled+'-1,'+hexToRgb(colorRGB)+');\n'
  code +='setSingleMode('+indexled+'-1, MODE_SET, 0);\n';

  return code;
};

Blockly.Arduino.IndexColorledBreath = function() {

  var colorRGB = this.getFieldValue('colorRGB');
  var indexled = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC);
  
  var code='setSingleLed('+indexled+'-1,'+hexToRgb(colorRGB)+');\n'
  code +='setSingleMode('+indexled+'-1,MODE_BREATH , 0);\n';
  
  return code;
};

Blockly.Arduino.IndexColorledBlink = function() {

  var colorRGB = this.getFieldValue('colorRGB');
  var indexled = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC);
   var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
 
  var code='setSingleLed('+indexled+'-1,'+hexToRgb(colorRGB)+');\n'
  code +='setSingleMode('+indexled+'-1,MODE_BLINK ,'+time+');\n';
  
  return code;
};

Blockly.Arduino.IndexColorledblinkIndex = function() {

  var colorRGB = this.getFieldValue('colorRGB');
  var indexled = Blockly.Arduino.valueToCode(this, 'Index0', Blockly.Arduino.ORDER_ATOMIC);
  var index = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC);
  var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
 
  var code='setSingleLed('+indexled+'-1,'+hexToRgb(colorRGB)+');\n'
  code +='setSingleMode('+indexled+'-1,MODE_BLINK ,'+time+');\n';
  code+='setSingleCount('+indexled+'-1,'+index+');\n';
  return code;
};
// Blockly.Arduino.ColorledSwatches = function() {

//   var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

//   var colorRGB = this.getFieldValue('colorRGB');

//   var code='Colorled.setColor('+LEDNumber+'-1, '+hexToRgb(colorRGB)+');\n';
//   return code;
// };

// Blockly.Arduino.ColorledAllSwatches = function() {

//   var colorRGB = this.getFieldValue('colorRGB');

//   var code='Colorled.setAllColor('+hexToRgb(colorRGB)+');\n';
//   return code;
// };

// Blockly.Arduino.ColorledSwatchesRGB = function() {

//   var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

//   var red = Blockly.Arduino.valueToCode(this, 'red', Blockly.Arduino.ORDER_ATOMIC)
//   var green = Blockly.Arduino.valueToCode(this, 'green', Blockly.Arduino.ORDER_ATOMIC)
//   var blue = Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

//   var code='Colorled.setColor('+LEDNumber+'-1, '+red+','+green+','+blue+');\n';
//   return code;
// };

// Blockly.Arduino.ColorledAllSwatchesRGB = function() {

//   var red = Blockly.Arduino.valueToCode(this, 'red', Blockly.Arduino.ORDER_ATOMIC)
//   var green = Blockly.Arduino.valueToCode(this, 'green', Blockly.Arduino.ORDER_ATOMIC)
//   var blue = Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

//   var code='Colorled.setAllColor('+red+','+green+','+blue+');\n'
//   return code;
// };

// Blockly.Arduino.ColorRainbow = function() {

//   var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC)

//   var code= 'Colorled.ledRainbow('+time+');\n';
//   return code;
// };

// Blockly.Arduino.colorbreathblink = function() {

//   var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC)
//   var colorRGB = this.getFieldValue('colorRGB');
//   var action = this.getTitleValue('action');

//   var code='';
//   if(action=="breath") {
//     code+='Colorled.ledAllbreath('+hexToRgb(colorRGB)+','+time+');\n';
//   } else {
//     code+='Colorled.ledAllblink('+hexToRgb(colorRGB)+','+time+');\n';
//   }
//   return code;
// };

// Blockly.Arduino.colorblinknum = function() {
//   var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)
//   var Index = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC)
//   var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC)
//   var colorRGB = this.getFieldValue('colorRGB');

//   var code='Colorled.ledBlinkNum('+Index+','+LEDNumber+'-1,'+hexToRgb(colorRGB)+','+time+');\n';
//   return code;
// };

// Blockly.Arduino.colorAllblinknum = function() {
//   var Index = Blockly.Arduino.valueToCode(this, 'Index', Blockly.Arduino.ORDER_ATOMIC)
//   var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC)
//   var colorRGB = this.getFieldValue('colorRGB');

//   var code='Colorled.allLedBlinkNum('+Index+','+hexToRgb(colorRGB)+','+time+');\n';
//   return code;
// };