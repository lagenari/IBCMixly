'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet = 518;
var colorSet='#efa752';

Blockly.Blocks.Sensor_Crash_digital = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Crash.png", 40, 30))
    .appendTitle(Blockly.crashButton)
    .appendTitle(Blockly.get_Pin)
    this.appendValueInput("digitalPin", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    this.appendDummyInput()
    .appendTitle(Blockly.Keyget_Check)
    .appendTitle(new Blockly.FieldDropdown([[Blockly.KeyInputPRESS, "down"], [Blockly.KeyInputRELEASE, "up"]]),'action');


    this.setInputsInline(true);
    var tip="获取一个数字值\n";
    tip+="返回一个数字值\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Boolean);

}
};

Blockly.Blocks.Sensor_Crash_Key = {
  init: function() {
   var CHECK = [[Blockly.shortPress, 'SHORT_PRESS'],
   [Blockly.longPress, 'LONG_PRESS']];                   
   this.setColour(colorSet);
   this.appendDummyInput("")
   .appendField(new Blockly.FieldImage("../../media/Microduino/Crash.png", 40, 30))
   .appendTitle(Blockly.crashButton)
   .appendTitle(Blockly.get_Pin)
    this.appendValueInput("KPin", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    this.appendDummyInput()
   .appendTitle(Blockly.Keyget_Check)
   .appendTitle(new Blockly.FieldDropdown(CHECK), "CHECK");

    var tip="定义碰撞开关的引脚和事件类型\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendStatementInput('DO');
}
};