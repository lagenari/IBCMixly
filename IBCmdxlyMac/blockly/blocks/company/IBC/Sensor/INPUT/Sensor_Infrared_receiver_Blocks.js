'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.SensorIRReciverInit = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 40, 30))
    .appendTitle(Blockly.IRReciverInitC)
    .appendTitle(Blockly.get_Pin)
    .appendTitle(new Blockly.FieldTextInput('4'),'Pin')
    .appendTitle(Blockly.IRReciverData);

    var tip="使用红外接收必须要先初始化！\n";
    tip+="定义红外接收管脚并接收数据\n";
    this.setTooltip(tip);

    this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setTooltip("test");  
    //this.setInputsInline(true);
},
};

Blockly.Blocks.SensorIRReciverRaw = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput("PIN", Number)
    .appendField(new Blockly.FieldImage("../../media/Microduino/IR_R.png", 40, 30))
    .appendTitle(Blockly.MIXLY_IR_RECEIVE_RAW)
    .setCheck(Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_IR_RECIEVE_RAW_TOOLTIP);
  }
};

Blockly.Blocks.SensorIRReciverEnable = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput("PIN", Number)
    .appendField(new Blockly.FieldImage("../../media/Microduino/IR_R.png", 40, 30))
    .appendTitle(Blockly.IRReciverEnable)
    .setCheck(Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_IR_RECIEVE_RAW_TOOLTIP);
  }
};

Blockly.Blocks.Sensor_IRReciverRaw_Key = {
  init: function() {
   var CHECK = [
   [Blockly.Infrared_receiver_POWER,'0x1FE48B7'],
   [Blockly.Infrared_receiver_A,'0x1FE807F'],
   [Blockly.Infrared_receiver_B,'0x1FE40BF'],
   [Blockly.Infrared_receiver_C,'0x1FEC03F'],
   [Blockly.Infrared_receiver_D,'0x1FE20DF'],
   [Blockly.Infrared_receiver_E,'0x1FE609F'],
   [Blockly.Infrared_receiver_LEFT,'0x1FEE01F'],
   [Blockly.Infrared_receiver_RIGHT,'0x1FE906F'],
   [Blockly.Infrared_receiver_UP,'0x1FEA05F'],
   [Blockly.Infrared_receiver_DOWN,'0x1FED827'],
   [Blockly.Infrared_receiver_OK,'0x1FE10EF'],
   [Blockly.Infrared_receiver_BACK,'0x1FE50AF'],
   [Blockly.Infrared_receiver_VOLUP,'0x1FEF807'],
   [Blockly.Infrared_receiver_VOLDOWN,'0x1FE708F'],
   [Blockly.Infrared_receiver_MUTE,'0x1FEB04F'],
   [Blockly.Infrared_receiver_PLAY,'0x1FE30CF']
   ];                   
   this.setColour(colorSet);
   this.appendDummyInput("")
   .appendField(new Blockly.FieldImage("../../media/Microduino/IR_R.png", 40, 30))
   .appendTitle(Blockly.MIXLY_NOVA_IR_REC)
   .appendTitle(Blockly.REMOTE_CONTRO_KEY)
   .appendTitle(new Blockly.FieldDropdown(CHECK), "CHECK");

    var tip="红外接收遥控器信号\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendStatementInput('DO');
  },
};