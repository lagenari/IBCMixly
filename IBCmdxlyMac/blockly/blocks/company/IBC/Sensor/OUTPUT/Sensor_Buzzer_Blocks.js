'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';


Blockly.Blocks.BuzzerInit = {	
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.BuzzerInit);
    this.appendValueInput("BuzzerPin", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.get_Pin);

    var tip="定义控制蜂鸣器的引脚\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerTone = { 
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.Buzzer);
    this.appendValueInput("Frequency", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.Frequency);

    var tip="定义控制蜂鸣器的引脚\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerToneTime = { 
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.Buzzer);
    this.appendValueInput("Frequency", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.Frequency);
    this.appendValueInput("Time", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.audioDuration);

    var tip="定义控制蜂鸣器的引脚\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerToneMelody = {
  init: function() {

    var buzzerMelody =[[Blockly.low1DO, "262"], [Blockly.low2RE, "294"], [Blockly.low3MI, "330"],
    [Blockly.low4FA, "349"], [Blockly.low5SO, "392"], [Blockly.low6LA, "440"],
    [Blockly.low7XI, "494"], [Blockly.midlle1DO, "523"], [Blockly.midlle2RE, "587"], 
    [Blockly.midlle3MI, "659"],[Blockly.midlle4FA, "698"], [Blockly.midlle5SO, "784"], 
    [Blockly.midlle6LA, "880"],[Blockly.midlle7XI, "988"], [Blockly.high1DO, "1046"], 
    [Blockly.high2RE, "1175"], [Blockly.high3MI, "1318"],[Blockly.high4FA, "1397"], 
    [Blockly.high5SO, "1568"], [Blockly.high6LA, "1760"],[Blockly.high7XI, "1967"]
    ];
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.Buzzer);
    this.appendDummyInput("")
    .appendTitle(Blockly.BuzzerMelody)
    .appendTitle(new Blockly.FieldDropdown(buzzerMelody), "buzzerMelody");

    var tip="定义控制蜂鸣器的引脚和旋律\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerNoTone = { 
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.BuzzerNoTone)

    var tip="关闭蜂鸣器\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerToneSong = {
  init: function() {

    var buzzerSong =[[Blockly.BuzzerSong1, "1"], [Blockly.BuzzerSong2, "2"], [Blockly.BuzzerSong3, "3"],
    [Blockly.BuzzerSong4, "4"], [Blockly.BuzzerSong5, "5"], [Blockly.BuzzerSong6, "6"],
    [Blockly.BuzzerSong7, "7"], [Blockly.BuzzerSong8, "8"], [Blockly.BuzzerSong9, "9"],
    [Blockly.BuzzerSong10, "10"]];

    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.Buzzer);
    this.appendDummyInput("")
    .appendTitle(Blockly.BuzzerSong)
    .appendTitle(new Blockly.FieldDropdown(buzzerSong), "buzzerSong");

    var tip="定义控制蜂鸣器曲目\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerOff = { 
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.BuzzerStopSong)

    var tip="停止播放歌曲\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks.BuzzerSongreset = { 
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
    .appendTitle(Blockly.BuzzerSongreset)

    var tip="蜂鸣器歌曲复位\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.appendStatementInput('DO');
  },
};