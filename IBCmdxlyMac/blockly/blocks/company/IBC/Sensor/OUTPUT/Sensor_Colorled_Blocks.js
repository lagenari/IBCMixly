'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';

Blockly.Blocks.ColorledInit = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 40, 30))
    .appendTitle(Blockly.ColorLEDInit)
    .appendTitle(Blockly.ColorLEDNumber)
    .appendTitle(new Blockly.FieldTextInput('2'),'LEDNumber')
    .appendTitle(Blockly.ColorLEDPin)
    .appendTitle(new Blockly.FieldTextInput('12'),'LEDPin');

    var tip="使用彩灯必须要先初始化！\n";
    tip+="定义彩灯所需的库函数和对象\n";
    this.setTooltip(tip);

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
   // this.setTooltip("test");  
   this.setInputsInline(true);
},
};

Blockly.Blocks.ColorledLight = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDAllControl);

    this.appendValueInput("Light", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.ColorledLight);

    var tip="控制指定灯的颜色\n";
    this.setTooltip(tip);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
this.setInputsInline(true);
},
};



Blockly.Blocks.ColorRainbow = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDAllControl+Blockly.ColorLEDRainbow);

    var tip="设置彩灯炫彩效果\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

Blockly.Blocks.ColorledSingle = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDAllControl+Blockly.ColorLEDSingle);

    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");
    var tip="控制所有彩灯颜色\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
},
};

Blockly.Blocks.ColorledBreath = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDAllControl+Blockly.ColorLEDBreath);

    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#00FF00"), "colorRGB");
    
    var tip="控制所有彩灯呼吸效果\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

Blockly.Blocks.ColorledBlink = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDAllControl+Blockly.ColorLEDBlink);

    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#0000FF"), "colorRGB");
    this.appendValueInput("TIME", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.LEDBreathingTime);

    var tip="控制所有彩灯闪烁\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

Blockly.Blocks.ColorledblinkIndex = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDAllControl);

    this.appendValueInput("Index", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.ColorLEDBlinkIndex);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#FF00FF"), "colorRGB");  
    this.appendValueInput("TIME", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.LEDBreathingTime);

    var tip="控制所有彩灯闪烁次数\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

Blockly.Blocks.IndexColorRainbow = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDOneControl);
    this.appendValueInput("Index", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorOneIndex+Blockly.ColorLEDRainbow);

    var tip="设置特定彩灯炫彩效果\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};


Blockly.Blocks.IndexColorledSingle = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDOneControl);
    this.appendValueInput("Index", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorOneIndex+Blockly.ColorLEDSingle);

    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");

    var tip="控制所有彩灯颜色\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
},
};

Blockly.Blocks.IndexColorledBreath = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDOneControl);
    this.appendValueInput("Index", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorOneIndex+Blockly.ColorLEDBreath);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#00FF00"), "colorRGB");
    
    var tip="控制所有彩灯呼吸效果\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

Blockly.Blocks.IndexColorledBlink = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
    .appendTitle(Blockly.ColorLEDOneControl);
    this.appendValueInput("Index", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorOneIndex+Blockly.ColorLEDBlink);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#0000FF"), "colorRGB");
    this.appendValueInput("TIME", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.LEDBreathingTime);

    var tip="控制所有彩灯闪烁\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

Blockly.Blocks.IndexColorledblinkIndex = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
        .appendTitle(Blockly.ColorLEDOneControl);
    this.appendValueInput("Index0", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorOneIndex);
    this.appendValueInput("Index", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.ColorLEDBlinkIndex);
    this.appendDummyInput("")
    .appendTitle(Blockly.ColorSet)
    .appendField(new Blockly.FieldColour("#FF00FF"), "colorRGB");  
    this.appendValueInput("TIME", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.LEDBreathingTime);

    var tip="控制所有彩灯闪烁次数\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
    this.setInputsInline(true);
},
};

// Blockly.Blocks.ColorledSwatches = {
//   init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//     .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
//     .appendTitle(Blockly.ColorLEDOneControl)

//     this.appendValueInput("LEDIndex", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)

//     this.appendDummyInput("")
//     .appendTitle(Blockly.ColorLEDOneIndex)
//     .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");

//     var tip="控制指定灯的颜色\n";
//     this.setTooltip(tip);
//     //this.appendStatementInput('DO')
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
// //    this.setTooltip("test");  
// this.setInputsInline(true);
// },
// };

// Blockly.Blocks.ColorledSwatchesRGB = {
//   init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//     .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
//     .appendTitle(Blockly.ColorLEDOneControl)
//     this.appendValueInput("LEDIndex", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//         // .appendTitle(Blockly.ColorLEDIndex);
//         this.appendValueInput("red", Number)
//         .setCheck(Number)
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendTitle(Blockly.ColorLEDOneIndex+Blockly.ColorLEDRed)
//         this.appendValueInput("green", Number)
//         .setCheck(Number)
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendTitle(Blockly.ColorLEDGreen);
//         this.appendValueInput("blue", Number)
//         .setCheck(Number)
//         .setAlign(Blockly.ALIGN_RIGHT)
//         .appendTitle(Blockly.ColorLEDBlue);


//         var tip="定义彩灯序号和颜色\n";
//         tip+="红,绿,蓝颜色值在0~255之间\n";
//         this.setTooltip(tip);
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);  
//         this.setInputsInline(true);
//     },
// };

// Blockly.Blocks.ColorledAllSwatchesRGB = {
//   init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//     .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
//     .appendTitle(Blockly.ColorLEDAllControl)

//     this.appendValueInput("red", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.ColorLEDRed)
//     this.appendValueInput("green", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.ColorLEDGreen);
//     this.appendValueInput("blue", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.ColorLEDBlue);


//     var tip="控制所有彩灯颜色\n";
//     tip+="红,绿,蓝颜色值在0~255之间\n";
//     this.setTooltip(tip);
//     //this.appendStatementInput('DO')
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
// //    this.setTooltip("test");  
// this.setInputsInline(true);
// },
// };


// Blockly.Blocks.colorbreathblink = {
//   init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//     .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
//     this.appendDummyInput()
//     .appendTitle(Blockly.effect)
//     .appendTitle(new Blockly.FieldDropdown([[Blockly.breath, "breath"], [Blockly.blink, "blink"]]),'action');
//     this.appendDummyInput("")
//     .appendTitle(Blockly.ColorSet)
//     .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");
//     this.appendValueInput("TIME", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.LEDBreathingTime);

//     var tip="设置彩灯呼吸、闪烁效果\n";
//     tip+="可调节颜色变换时间\n";
//     this.setTooltip(tip);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null); 
//     this.setInputsInline(true);
// }
// };

// Blockly.Blocks.colorblinknum = {
//   init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//     .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
//     .appendTitle(Blockly.ColorLEDOneControl);
//     this.appendValueInput("LEDIndex", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT);
//     this.appendValueInput("Index", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.ColorLEDblinkIndex);
//     this.appendDummyInput("")
//     .appendTitle(Blockly.ColorSet)
//     .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");
//     this.appendValueInput("TIME", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.LEDBreathingTime);

//     var tip="指定彩灯序号闪烁次数\n";
//     tip+="颜色可通过色盘选取\n";
//     this.setTooltip(tip);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);  
//     this.setInputsInline(true);
// },
// };

// Blockly.Blocks.colorAllblinknum = {
//   init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//     .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
//     .appendTitle(Blockly.ColorLEDOneControl);
//     this.appendValueInput("Index", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.ColorLEDblinkAll);
//     this.appendDummyInput("")
//     .appendTitle(Blockly.ColorSet)
//     .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");
//     this.appendValueInput("TIME", Number)
//     .setCheck(Number)
//     .setAlign(Blockly.ALIGN_RIGHT)
//     .appendTitle(Blockly.LEDBreathingTime);

//     var tip="所有彩灯闪烁次数\n";
//     tip+="颜色可通过色盘选取\n";
//     this.setTooltip(tip);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);  
//     this.setInputsInline(true);
// },
// };
