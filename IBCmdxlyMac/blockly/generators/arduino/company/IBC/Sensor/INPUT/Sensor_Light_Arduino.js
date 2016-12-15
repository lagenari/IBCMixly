'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.Sensor_Light_analog = function() {
	//var analogPin = this.getFieldValue('analogPin');
    var analogPin = Blockly.Arduino.valueToCode(this, 'analogPin', Blockly.Arduino.ORDER_ATOMIC);
	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';

	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Sensor_Light_Key= function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var pin = Blockly.Arduino.valueToCode(this, 'KPin', Blockly.Arduino.ORDER_ATOMIC);
  var mindata = Blockly.Arduino.valueToCode(this, 'mindata', Blockly.Arduino.ORDER_ATOMIC);
  var maxdata = Blockly.Arduino.valueToCode(this, 'maxdata', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', INPUT_PULLUP);';
  
  var code='';
  code+='if(Key'+pin+'.read('+mindata+','+maxdata+')==SHORT_PRESS) {\n';
  code+=branch;
  code+='}\n';
  code+='delay(15);\n';

  return code;
};