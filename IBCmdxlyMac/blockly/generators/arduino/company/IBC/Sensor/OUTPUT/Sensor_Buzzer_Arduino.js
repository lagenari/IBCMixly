'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.BuzzerInit = function() {
	var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)
	Blockly.Arduino.definitions_['define_BUZZERH'] = '#include "buzzerMusic.h"';
	Blockly.Arduino.definitions_['define_Adafruit_NeoPixel'] = '#include<colorLed.h>';
    Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel ledStrip = Adafruit_NeoPixel(2,-1, NEO_GRB + NEO_KHZ800);';

	Blockly.Arduino.setups_['setups_BuzzerPin'] ='buzzerBegin('+BuzzerPin+');\n';
	Blockly.Arduino.setups_['setups_mySCoop'] ='mySCoop.start();\n';

	var code='yield();\n';
    return code;
};

Blockly.Arduino.BuzzerTone = function() {
	var Frequency = Blockly.Arduino.valueToCode(this, 'Frequency', Blockly.Arduino.ORDER_ATOMIC)

	var code='buzzerfre('+Frequency+');\n';
	return code;
};

Blockly.Arduino.BuzzerToneTime = function() {
	var Frequency = Blockly.Arduino.valueToCode(this, 'Frequency', Blockly.Arduino.ORDER_ATOMIC)
    var time = Blockly.Arduino.valueToCode(this, 'Time', Blockly.Arduino.ORDER_ATOMIC)

	var code='buzzertime('+Frequency+','+time+');\n';
	return code;
};

Blockly.Arduino.BuzzerToneMelody = function() {
	var buzzerMelody = this.getTitleValue('buzzerMelody');

    var code='buzzerfre('+buzzerMelody+');\n';
	return code;
};

Blockly.Arduino.BuzzerNoTone = function() {

	var code='buzzeroff();\n';
	return code;
};

Blockly.Arduino.BuzzerToneSong = function() {
	var ToneSong = this.getTitleValue('buzzerSong');
    var code='playSound('+ToneSong+'-1 );\n';
	return code;
};

Blockly.Arduino.BuzzerOff = function() {

	var code='playoff();\n';
	return code;
};

Blockly.Arduino.BuzzerSongreset = function() {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
	var code='if(playOver()){\n';
	code+=branch;
	code+='}\n';
	return code;
};