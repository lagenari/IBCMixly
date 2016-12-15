/*
  =================================================================================                         
                             |什么是刷卡音乐盒? |
  ---------------------------------------------------------------------------------                         
  用一张有黑色条纹的卡在音乐盒的卡槽里刷过，可以来选择播放不同的歌曲。一条黑色条纹是
  选择歌曲#1, 两条是选择歌曲#2, 等等。音乐盒里总共有11首不同的歌曲，当然你可以自己制
  作卡片，在上面任何地方画上1到11个条纹，就可以用来播放11首音乐！

  你也可以把喜欢的乐曲添加到 music.h 文件里。

  如果不能正常工作，试着慢点刷。
  =================================================================================
                                   | 开始 |
  ---------------------------------------------------------------------------------
  利用灰度传感器来识别条码，就像条形码扫描器一样，来播放各种有趣的音乐。
  =================================================================================
                           | 自己动手修改代码! |
  ---------------------------------------------------------------------------------
  点开 userDef.h 文件，然后根据你自己的喜好更改下面的参数。 :)
  
  DOCK_MAX:   灰度传感器检测的触发值。
  BRIGHT_MAX: LED彩灯显示的最大亮度。
  
  修改完这些值后，记得再把代码上传到mBattery里。
  =================================================================================
                              | 头脑风暴 |
  ---------------------------------------------------------------------------------                           
  1. 是否可以修改 "music.h" 里的音乐或者是添加自己的音乐?
     可以，最好能懂一些乐理，可能添加的音乐会听起来比较奇怪
  2. 是否可以添加两个触碰传感器来控制音乐，而不是用按键控制？ 
     可以。一个是选择上一首，另一个是选择下一首。
       
    注意: 以上功能上的变动会涉及到程序上的改动。  
  =================================================================================
                               | 端口连接|
  ---------------------------------------------------------------------------------
  蜂鸣器:     D10
  ColorLED：  D12
  灰度传感器：A0  
  =================================================================================
                                  | 问题 |
  ---------------------------------------------------------------------------------                                 
  欢迎访问 http://forum.microduino.cn/，在我们的论坛提交您的问题， 我们会尽快回复您。
*/

#include <Microduino_Key.h>
#include "colorLed.h"
#include "music.h"
#include "userDef.h"

Key keyLine(PIN_LINEA, INPUT);

uint32_t cardTimer = 0;
uint8_t cardNum = 0;
uint8_t playNum = 0;

void setup() {
  Serial.begin(9600);
  strip.begin(); 
  strip.setBrightness(BRIGHT_MAX);
#if DEBUG
  Serial.println("**************START************");
#endif
}

void loop() {
#if DEBUG
  Serial.print("LINE Val:");
  Serial.println(analogRead(PIN_LINE));      //灰度传感器检测到的亮度。
#endif
  getCard();
  if (millis() - cardTimer > 1000 && cardTimer > 0) //1秒钟内没有检测到新的条纹，即认为刷卡结束。
  {
    noTone(PIN_BUZZER);
    setAllLed(COLOR_NONE);
    playNum = constrain(cardNum - 1, 0, SONG_SUM - 1); //根据扫描到的黑色条纹数播放相应的音乐。
    cardNum = 0;
    playIndex = 0;
    cardTimer = 0;
    allLedBlinkNum(playNum, COLOR_WARM, 500);
  }
  if (!playSound(playNum))//播放音乐。
  {
    noTone(PIN_BUZZER);
    ledBreath(COLOR_GREEN, 15);
  }
}

void getCard()
{
  if (keyLine.read(0, DOCK_MAX) == SHORT_PRESS)
  {
    setAllColor(COLOR_BLUE);
    cardNum++; 
    cardTimer = millis();
  }
}
