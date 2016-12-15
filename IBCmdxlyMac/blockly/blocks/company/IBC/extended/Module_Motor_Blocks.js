'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=120;
var colorSet='#27b6ac';

Blockly.Blocks.MotorBegin = {
	init: function() {
		this.setColour(colorSet);
		this.appendDummyInput("")
		.appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Motor.png", 45, 32))
		.appendTitle(Blockly.setup_motor)
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);
	}
};


Blockly.Blocks.MotorControl = {
  init: function() {
    var CHECK = [[Blockly.motorA, 'motorA'],
    [Blockly.motorB, 'motorB']];

    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendTitle(Blockly.motorABctrl);
    this.appendDummyInput()
    .appendTitle(Blockly.motorchoose)
    .appendTitle(new Blockly.FieldDropdown(CHECK), "CHECK");
    this.appendValueInput("speed", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.motorSpeed);
    //this.setOutput(true, Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};