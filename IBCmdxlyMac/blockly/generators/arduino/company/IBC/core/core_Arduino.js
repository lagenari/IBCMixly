'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.serialBegin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');


  var flip = this.getFieldValue('FLIP');


  Blockly.Arduino.setups_['setup_baud'] = 'Serial.begin('+flip+');';

  var code='';

  return code;
};


Blockly.Arduino.serialPrint = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var serialData = Blockly.Arduino.valueToCode(this, 'serialData', Blockly.Arduino.ORDER_ATOMIC) || '';
  var code='Serial.print('+serialData+');\n';
  return code;
  
};

Blockly.Arduino.serialPrintln = function() {
  var serialData = Blockly.Arduino.valueToCode(this, 'serialData', Blockly.Arduino.ORDER_ATOMIC) || '';
  var code='Serial.println('+serialData+');\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
  
};

Blockly.Arduino.MicroduinosleepTimer = function() {
  var intervalTime = Blockly.Arduino.valueToCode(this, 'RepeatTime', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['define_SCoop'] = '#include <SCoop.h>';
  Blockly.Arduino.setups_['setup_SCoop'] = 'mySCoop.start();';

  var code = 'sleep('+intervalTime+');\n';
  return code;
};

Blockly.Arduino.microduinoAnaloyWrite = function() {
  var mCookie_pwmPin = this.getTitleValue('mCookie_pwmPin');
  var pwmNumber = Blockly.Arduino.valueToCode(this, 'pwmNumber', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code = 'analogWrite('+mCookie_pwmPin+','+pwmNumber+');\n';

  return code;
};

Blockly.Arduino.microduinoWatting = function() {
  var wait = Blockly.Arduino.valueToCode(this, 'wait',Blockly.Arduino.ORDER_ATOMIC) || 'false';

  var code='';
  code+='while(!'+wait+');\n';
  return code;
};

Blockly.Arduino.microduinoWhile = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var wait = Blockly.Arduino.valueToCode(this, 'wait',Blockly.Arduino.ORDER_ATOMIC) || 'false';

  var code='';
  code+='while('+wait+') {\n';
  code+=branch+'\n';
  code+='}\n';
  return code;
};

Blockly.Arduino.MicroduinowhileTimer = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'TimerDOing');
  var timerName = this.getFieldValue('timerName');
  var intervalTime = Blockly.Arduino.valueToCode(this, 'RepeatTime', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_'+timerName+'Timer'] = '#define INTERVAL_'+timerName+' '+intervalTime;
  
  var code='';

  code+='unsigned long '+timerName+'Time = millis();\n';
  code+='while(millis()-'+timerName+'Time<INTERVAL_'+timerName+') {\n';
  code+=branch;
  code+='} \n';

  return code;
};

Blockly.Arduino.microduinoFor = function() {
  // For loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
    this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var step =  window.parseFloat(this.getTitleValue('STEP'));
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + this.id + '\'') + branch;
  }
  var code;
  var down = step<0;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
    argument1.match(/^-?\d+(\.\d+)?$/)) {
    code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
  variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
  variable0 + ' = '  + variable0 + ' + (' +step+')) {\n' +
  branch + '}\n';
}else {
      //涉及到变量
      code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
      variable0 + (down ? ' >= ' : ' <= ')+'(' + argument1 + '); ' +
      variable0 + ' = '  + variable0 + ' + (' +step+')) {\n' +
      branch + '}\n';
    }
    return code;
  };

  Blockly.Arduino.timemillis = function() {

  var code='millis()';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};