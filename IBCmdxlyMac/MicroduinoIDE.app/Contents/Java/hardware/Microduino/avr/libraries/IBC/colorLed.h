#ifndef __COLOR_LED_H__
#define __COLOR_LED_H__

#include <SCoop.h>  // instead of original #include <Scheduler.h>
#include <Adafruit_NeoPixel.h>//Import the library for the ColorLED.

#define MODE_OFF    0
#define MODE_SET      1
#define MODE_BREATH   2
#define MODE_BLINK    3
#define MODE_RAINBOW  4

#define COLOR_MAX 255   //Max value for ColorLED 
#define COLOR_MIN 0     //Min value for ColorLED
#define LED_MAX   6

#define COLOR_NONE    0    //colorLED OFF
#define COLOR_WARM    1    
#define COLOR_COLD    2    
#define COLOR_RED     3    
#define COLOR_ORANGE  4    
#define COLOR_YELLOW  5  
#define COLOR_GREEN   6   
#define COLOR_BLUE    7   
#define COLOR_INDIGO  8  
#define COLOR_PURPLE  9  
#define COLOR_WHITE   10 

//Array to hold preset colors.
const uint16_t colorArray[10][3] = {
  {0,   0,   0   },        //colorLED OFF
  {155, 100, 0   },        //Warm
  {100, 130, 100 },        //Cold
  {255, 0,   0   },        //Red
  {234, 139, 23  },        //Orange
  {255, 255, 0   },        //Yellow
  {0,   255, 0   },        //Green
  {0,   255, 255 },        //Lime
  {0,   0,   255 },        //Blue
  {255, 0,   255 },        //Purple
};

typedef struct stLedStatus{
    uint8_t color[3];
    uint8_t brightness;
    uint8_t mode;
    uint8_t count;
    uint32_t interval;
}stLedSta;

static uint32_t ledCounter = 0;

stLedSta ledSta[LED_MAX];

extern Adafruit_NeoPixel ledStrip;


//------------Sets color of one LED-------------//
void setSingleLed(uint8_t index, uint8_t color_r, uint8_t color_g, uint8_t color_b){
  ledSta[index].color[0] = color_r;
  ledSta[index].color[1] = color_g;
  ledSta[index].color[2] = color_b;
}

//------------Sets color of one LED-------------//
void setSingleColor(uint8_t index, uint8_t color_n){
  setSingleLed(index, colorArray[color_n][0], colorArray[color_n][1], colorArray[color_n][2]);
}

//------------Sets all LEDs to one color-------------//
void setAllLed(uint8_t color_r, uint8_t color_g, uint8_t color_b){
  for(uint8_t i = 0; i < ledStrip.numPixels(); i++)
    setSingleLed(i, color_r, color_g, color_b);
}

//------------Sets all LEDs to one color-------------//
void setAllColor(uint8_t color_n){
  setAllLed(colorArray[color_n][0], colorArray[color_n][1], colorArray[color_n][2]);
}


void setSingleMode(uint8_t index, uint8_t mode_n, uint32_t interval){
  ledSta[index].count = 255;
  ledSta[index].interval = interval; 
  if(mode_n != ledSta[index].mode){
  ledSta[index].mode = mode_n;
  if(interval > 0)
    ledCounter -= ledCounter%interval;
  }
}

void setAllMode(uint8_t mode_n, uint32_t interval){
  for(uint8_t i = 0; i < ledStrip.numPixels(); i++)
    setSingleMode(i, mode_n, interval);

}

void setSingleCount(uint8_t index, uint8_t count){
  ledSta[index].count = count;  
}

void setAllCount(uint8_t count){
  for(uint8_t i = 0; i < ledStrip.numPixels(); i++)
    setSingleCount(i, count); 
}

defineTask(ledTask)

void ledTask::setup(){
  ledStrip.begin();
}

void ledTask::loop(){
  ledCounter++;
  uint8_t ledCounterTemp;
  uint8_t ledColor[3];
  for (uint8_t i = 0; i < ledStrip.numPixels(); i++){
   ledCounterTemp = ledCounter&0xFF;
     switch(ledSta[i].mode){
        case MODE_BREATH:
          ledSta[i].brightness = (ledCounterTemp > 127) ? (255 - ledCounterTemp) : ledCounterTemp; 
          ledColor[0] = (ledSta[i].color[0] * ledSta[i].brightness) >> 7;
          ledColor[1] = (ledSta[i].color[1] * ledSta[i].brightness) >> 7;
          ledColor[2] = (ledSta[i].color[2] * ledSta[i].brightness) >> 7;      
          break;
        case MODE_BLINK:
          if(ledCounter%(ledSta[i].interval/20) == 0 && ledSta[i].count > 0)
            if(ledSta[i].brightness== 0)
              ledSta[i].brightness = 1;
            else{
              ledSta[i].brightness = 0;
              ledSta[i].count -= (ledSta[i].count < 255);  
            }
          ledColor[0] = ledSta[i].color[0] * ledSta[i].brightness;
          ledColor[1] = ledSta[i].color[1] * ledSta[i].brightness;
          ledColor[2] = ledSta[i].color[2] * ledSta[i].brightness;
          break;
        case MODE_RAINBOW:
      ledCounterTemp = (i*256/ledStrip.numPixels() + ledCounterTemp) &0xFF; 
          if (ledCounterTemp < 85){
             ledColor[0] = ledCounterTemp * 3;
             ledColor[1] = 255 - ledCounterTemp * 3;
             ledColor[2] = 0;
          }else if(ledCounterTemp < 170){
             ledCounterTemp -= 85;
             ledColor[0] = 255 - ledCounterTemp * 3;
             ledColor[1] = 0;
             ledColor[2] = ledCounterTemp * 3;
          }else{
             ledCounterTemp -= 170;
             ledColor[0] = 0;
             ledColor[1] = ledCounterTemp * 3;
             ledColor[2] = 255 - ledCounterTemp * 3;
          }
          break;
        case MODE_SET:
          ledColor[0] = ledSta[i].color[0];
          ledColor[1] = ledSta[i].color[1];
          ledColor[2] = ledSta[i].color[2];
          break;  
    case MODE_OFF:
      ledColor[0] = 0;
          ledColor[1] = 0;
          ledColor[2] = 0;
      break;
     }
     ledStrip.setPixelColor(i, ledColor[0], ledColor[1], ledColor[2]);//Set the color.
  }
  ledStrip.show();  //Light up the LEDs to new colors.
  sleep(20);
}

#endif