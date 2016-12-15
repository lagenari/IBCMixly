'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MotorBegin = function() {

   Blockly.Arduino.definitions_['define_motorinit'] = '#include <IRmotor.h>\n';
  Blockly.Arduino.definitions_['define_motorleft'] = 'Motor motorLeft(MOTOR1_PINA, MOTOR1_PINB);';
  Blockly.Arduino.definitions_['define_motorright'] = 'Motor motorRight(MOTOR2_PINA, MOTOR2_PINB);';

  var motorSetup='motorLeft.begin();\n';
  motorSetup+='motorRight.begin();\n';

  Blockly.Arduino.setups_['setup_motor'] = motorSetup;

  var code='';
  return code;
};

Blockly.Arduino.MotorControl = function() {

  var check = this.getFieldValue('CHECK');
  var Speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC) || '0'

  var code='';
  if(check=="motorA")
    code+='motorLeft.setSpeed('+Speed+');\n';
  else
    code+='motorRight.setSpeed('+Speed+');\n';
  
  return code;
};