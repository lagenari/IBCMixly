/*
  =================================================================================                         
                              |什么是小车? |
  ---------------------------------------------------------------------------------                         
  做一个小车很有趣! 警车，货车，房车等等。 
  你可以选择是否用遥控来控制它。让想象飞起来!
    
  =================================================================================
                                  | 怎么玩 |
  ---------------------------------------------------------------------------------
  用遥控器的按键从以下3种模式中选择1种:
  
 按键 A: 遥控模式
          - 用遥控器的方向键来控制小车。向前，向后，向左，向右。
          - 当转弯的时候， 蜂鸣器和信号灯会显示出方向。 
          
  按键 B: 循迹模式
          - 用黑胶带在地面上粘出轨道，把小车放到轨道上。小车会顺着轨道跑。
            
  按键 C: 声控 + 避障模式
          - 检测到声音时 (比如拍手), 小车将直线运动，直到碰到障碍物，然后小车会鸣叫，同时信号灯闪烁，
		      接下来小车会转弯直到没有障碍物阻挡。安静6秒钟后，小车就停下来。
            
  =================================================================================
                                    | 开始 |
  ---------------------------------------------------------------------------------
  用你知道的一切创造出了不起的东西!
  =================================================================================
                           | 自己动手修改代码! |
  ---------------------------------------------------------------------------------
  点开 userDef.h 文件，然后根据你自己的喜好更改下面的参数。 :)
  
  BRIGHT_MAX:   LED彩灯显示的最大亮度。
  MAX_THROTTLE: 小车的移动速度。
  STEER:        小车的转弯速度。
  
  修改完这些值后，记得再把代码上传到mBattery里。
  =================================================================================
                              | 头脑风暴 |
  ---------------------------------------------------------------------------------                           
  1. 可以把小车改装成警车，坦克，冰淇凌车吗？
  2. 可以在小车前面放一个碰撞传感器，让它在碰到墙的时候播放音乐吗?
  3. 可以在music.h文件里加入有趣的音乐吗?
     或许是救护车“滴度滴度”的声音，或许是冰淇凌车的声音。
  4. 既然你知道如何使用电机，你可以用积木制作一个飞机，每个机翼上放上一个电机，做成一个电子模型!
       
   注意: 以上功能上的变动会涉及到程序上的改动。
  =================================================================================
                               | 端口连接 |
  ---------------------------------------------------------------------------------
  蜂鸣器:         D10
  ColorLED:       D12
  灰度传感器 A:   A0
  灰度传感器 B:   A2
  声音检测传感器: A6
  红外接收器:     D4
  =================================================================================
                                  | 问题 |
  ---------------------------------------------------------------------------------                                 
  欢迎访问 http://forum.microduino.cn/，在我们的论坛提交您的问题， 我们会尽快回复您。
*/

#include "IRControl.h"
#include "motor.h"
#include "userDef.h"

uint8_t remoteCmd;
uint16_t lineValA;
uint16_t lineValB;
uint16_t micVal;

void setup() {
  // 把你的设置代码放在这，执行一次:
  Serial.begin(9600);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LINEA, INPUT);
  pinMode(PIN_LINEB, INPUT);
  strip.begin();
  strip.setBrightness(BRIGHT_MAX);
  irrecv.enableIRIn();
  MotorLeft.Fix(1.1);
  MotorRight.Fix(1);

  for (int i = 9; i >= 0; i--)
  {
    setAllLed(i);
    delay(200);
  }
#if DEBUG
  Serial.println("**************START************");
#endif  
}

void loop() {
  // 把主代码放在这，重复执行:
  if (irrecv.decode(&results)) {            //如果有红外信号,
     if (results.value != 0xFFFFFFFF && results.value != 0)//删除乱码
        remoteCmd = recvRemote(results.value);
     irrecv.enableIRIn();
     irrecv.resume(); 
  }
  micVal = analogRead(PIN_MIC);
  lineValA = analogRead(PIN_LINEA);
  lineValB = analogRead(PIN_LINEB);
#if DEBUG
   Serial.print("MIC Val:");
   Serial.print(micVal);
   Serial.print("\tLINEA Val:");
   Serial.print(lineValA);
   Serial.print("\tLINEB Val:");
   Serial.println(lineValB);
#endif

  switch(mode)
  {
      case MODE_A:
         remoteControl(remoteCmd);
         break;
      case MODE_B:
         trackControl(lineValA, lineValB);
         break;
      case MODE_C:
         micControl(micVal, lineValA, lineValB);
         break;   
      default:
         motorCoast();
         break;   
  }
  motorUpdate(leftSpeed, rightSpeed);
}


//------------红外接收功能-------------//
uint8_t recvRemote(uint32_t recvCode)
{
    uint8_t cmd = CMD_OK;
    switch(recvCode){
       case BUTTON_A:
          motorCoast();
          setAllLed(COLOR_RED);
          tone(PIN_BUZZER, TONE_DO);
          delay(300); 
          setAllLed(COLOR_NONE);
          noTone(PIN_BUZZER);
          mode = MODE_A;
          break;
       case BUTTON_B:
          motorCoast();
          setAllLed(COLOR_RED);
          tone(PIN_BUZZER, TONE_DO);
          delay(300);
          setAllLed(COLOR_GREEN);
          tone(PIN_BUZZER, TONE_RE);
          delay(300);
          setAllLed(COLOR_NONE);
          noTone(PIN_BUZZER);
          mode = MODE_B;
          break;
       case BUTTON_C:
          motorCoast();
          setAllLed(COLOR_RED);
          tone(PIN_BUZZER, TONE_DO);
          delay(300);
          setAllLed(COLOR_GREEN);
          tone(PIN_BUZZER, TONE_RE);
          delay(300);
          setAllLed(COLOR_BLUE);
          tone(PIN_BUZZER, TONE_MI);
          delay(300);
          setAllLed(COLOR_NONE);
          noTone(PIN_BUZZER);
          mode = MODE_C;
          break;
       case BUTTON_UP:
          cmd = CMD_UP;
          break;
       case BUTTON_DOWN:
          cmd = CMD_DOWN;
          break;
       case BUTTON_LEFT:
          cmd = CMD_LEFT;
          break;
       case BUTTON_RIGHT:
          cmd = CMD_RIGHT;
          break;
       case BUTTON_OK:
          cmd = CMD_OK;
          break;
       default:
          break;
   }
   return cmd;
}
