'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Sensor_Crash_digital = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getTitleValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="down") {
    code+='!digitalRead('+digitalPin+')';
  } else {
    code+='digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Sensor_Crash_Key = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  // var pin = this.getFieldValue('KPin');
  var pin = Blockly.Arduino.valueToCode(this, 'KPin', Blockly.Arduino.ORDER_ATOMIC);
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  //Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', INPUT_PULLUP);';
  
  var code='';
  code+='if(Key'+pin+'.read()=='+check+') {\n';
  code+=branch;
  code+='}\n';
  code+='delay(15);\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};