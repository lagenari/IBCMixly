#include "buzzerMusic.h"
#include<colorLed.h>
#include <SCoop.h>
#include <Microduino_Key.h>

Adafruit_NeoPixel ledStrip = Adafruit_NeoPixel(2, 12, NEO_GRB + NEO_KHZ800);
long leftcolor;
long ringhtcolor;
long ledTimer;
long score;
long scoreCache;
long scoreA;
long scoreB;
boolean playStatus;
boolean playgo;
void soundInit() {
  setAllLed(255,0,0);
  setAllMode(MODE_SET, 0);
  buzzerfre(1000);
  delay(500);
  setAllLed(0,0,0);
  setAllMode(MODE_SET, 0);
  buzzeroff();
  delay(500);
  setAllLed(255,255,0);
  setAllMode(MODE_SET, 0);
  buzzerfre(1000);
  delay(500);
  setAllLed(0,0,0);
  setAllMode(MODE_SET, 0);
  buzzeroff();
  delay(500);
  setAllLed(51,255,51);
  setAllMode(MODE_SET, 0);
  buzzerfre(1500);
  delay(500);
  setAllLed(0,0,0);
  setAllMode(MODE_SET, 0);
  buzzeroff();
}

void colorChoose(long lednumber, long _color) {
  switch (_color) {
   case 0:
    setSingleLed(lednumber-1,0,0,0);
    setSingleMode(lednumber-1, MODE_SET, 0);
    break;
   case 1:
    setSingleLed(lednumber-1,255,0,0);
    setSingleMode(lednumber-1, MODE_SET, 0);
    break;
   case 2:
    setSingleLed(lednumber-1,51,255,51);
    setSingleMode(lednumber-1, MODE_SET, 0);
    break;
   case 3:
    setSingleLed(lednumber-1,51,102,255);
    setSingleMode(lednumber-1, MODE_SET, 0);
    break;
   case 4:
    setSingleLed(lednumber-1,102,0,204);
    setSingleMode(lednumber-1, MODE_SET, 0);
    break;
  }
}

long updateScore() {
  if (!digitalRead(6)) {
    setSingleLed(2-1,0,0,0);
    setSingleMode(2-1, MODE_SET, 0);
    if (leftcolor == ringhtcolor && leftcolor > 0) {
      buzzertime(500,300);
      scoreA = scoreA + 1;
      setSingleLed(1-1,51,255,51);
      setSingleMode(1-1, MODE_SET, 0);
      sleep(600);
      setSingleLed(1-1,0,0,0);
      setSingleMode(1-1, MODE_SET, 0);

    } else {
      buzzertime(1000,300);
      scoreB = scoreB + 1;
      setSingleLed(1-1,255,0,0);
      setSingleMode(1-1, MODE_SET, 0);
      sleep(600);
      setSingleLed(1-1,0,0,0);
      setSingleMode(1-1, MODE_SET, 0);

    }
    leftcolor = 0;
    ringhtcolor = 0;

  } else if (!digitalRead(8)) {
    setSingleLed(1-1,0,0,0);
    setSingleMode(1-1, MODE_SET, 0);
    if (leftcolor == ringhtcolor && leftcolor > 0) {
      buzzertime(500,300);
      scoreB = scoreB + 1;
      setSingleLed(2-1,255,0,0);
      setSingleMode(2-1, MODE_SET, 0);
      sleep(600);
      setSingleLed(2-1,0,0,0);
      setSingleMode(2-1, MODE_SET, 0);

    } else {
      buzzertime(1000,300);
      scoreA = scoreA + 1;
      setSingleLed(2-1,255,0,0);
      setSingleMode(2-1, MODE_SET, 0);
      sleep(600);
      setSingleLed(2-1,0,0,0);
      setSingleMode(2-1, MODE_SET, 0);

    }
    leftcolor = 0;
    ringhtcolor = 0;
  }
  return scoreA - scoreB;
}

Key Key6(6, INPUT_PULLUP);
Key Key8(8, INPUT_PULLUP);
void playReset() {
  if(Key6.read()==LONG_PRESS) {
    playoff();
    scoreA = 0;
    scoreB = 0;
    soundInit();
    playStatus = true;
    playgo = true;
  }
  delay(15);
  if(Key8.read()==LONG_PRESS) {
    playoff();
    scoreA = 0;
    scoreB = 0;
    soundInit();
    playStatus = true;
    playgo = true;
  }
  delay(15);
}

void gameOver() {
  if(playOver()){
    playSound(3-1 );
  }
  setAllMode(MODE_RAINBOW, 0);
  playReset();
}

void updateLed() {
  if (millis() > ledTimer) {
    if (leftcolor == 0 || ringhtcolor == 0) {
      leftcolor = random(1, 5);
      ringhtcolor = random(1, 5);
      ledTimer = millis() + 800;

    } else {
      leftcolor = 0;
      ringhtcolor = 0;
      ledTimer = millis() + 800;

    }
    colorChoose(1, leftcolor);
    colorChoose(2, ringhtcolor);

  }
}

void ledBlinkNum(long num, long index, long wait) {
  for (int i = (1); i <= (num); i = i + (1)) {
    setSingleLed(index-1,0,0,0);
    setSingleMode(index-1, MODE_SET, 0);
    sleep(wait);
    setSingleLed(index-1,255,255,255);
    setSingleMode(index-1, MODE_SET, 0);
    sleep(wait);
  }
  setSingleLed(index-1,0,0,0);
  setSingleMode(index-1, MODE_SET, 0);
  sleep(wait);
}

void ledScore(long _score) {
  setAllLed(0,0,0);
  setAllMode(MODE_SET, 0);
  if (_score > 0) {
    ledBlinkNum(_score, 1, 300);

  } else if (_score < 0) {
    ledBlinkNum(abs(_score), 2, 300);
  }
}

void setup()
{
  buzzerBegin(10);

  mySCoop.start();

  ledStrip.setBrightness(255);
  mySCoop.start();
  leftcolor = 0;
  ringhtcolor = 0;
  ledTimer = 0;
  score = 0;
  scoreCache = 0;
  scoreA = 0;
  scoreB = 0;
  playStatus = false;
  playgo = false;
}

void loop()
{
  yield();
  yield();
  ledStrip.setBrightness(10);
  updateLed();
  if (playStatus) {
    playReset();
    scoreCache = score;
    score = abs(updateScore());
    if (score >= 3) {
      playStatus = false;
      playgo = true;

    } else if (score != scoreCache) {
      ledScore(score);
    }

  } else if (!playgo) {
    if(playOver()){
      setAllLed(0,255,0);
      setAllMode(MODE_BREATH, 0);
      playReset();
    }
  } else if (!playStatus) {
    gameOver();
  }

  leftcolor;

}