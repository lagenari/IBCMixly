/**************************************************************
   Blynk is a platform with iOS and Android apps to control
   Arduino, Raspberry Pi and the likes over the Internet.
   You can easily build graphic interfaces for all your
   projects by simply dragging and dropping widgets.

     Downloads, docs, tutorials: http://www.blynk.cc
     Blynk community:            http://community.blynk.cc
     Social networks:            http://www.fb.com/blynkapp
                                 http://twitter.com/blynk_app

   Blynk library is licensed under MIT license
   This example code is in public domain.

 **************************************************************
   Simple push notification example

   App dashboard setup:
     Push widget

   Connect a button to pin 2 and GND...
   Pressing this button will also push a message! ;)

 **************************************************************/
//#define BLYNK_DEBUG
#define BLYNK_PRINT Serial
#include <ESP8266_HardSer.h>
#include <BlynkSimpleShieldEsp8266_HardSer.h>
#include <SimpleTimer.h>

// Set ESP8266 Serial object
// Set ESP8266 Serial object
#define EspSerial Serial1

ESP8266 wifi(EspSerial);

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "794ba4f5a0f045e29ad5457e22d3335a";

SimpleTimer timer;

void setup()
{
  Serial.begin(9600);
  // Set ESP8266 baud rate
  EspSerial.begin(115200);
  delay(10);

  Blynk.begin(auth, wifi, "Makermodule", "microduino");

  while (Blynk.connect() == false) {
    // Wait until connected
  }

  // Notify immediately on startup
  Blynk.notify("Device started");

  // Setup a function to be called every minute
  timer.setInterval(60000L, notifyUptime);

  // Setup notification button on pin 2
  pinMode(6, INPUT_PULLUP);
}

void notifyUptime()
{
  long uptime = millis() / 60000L;

  // Actually send the message.
  // Note:
  //   We allow 1 notification per minute for now.
  Blynk.notify(String("Running for ") + uptime + " minutes.");
}

void loop()
{
  if (!digitalRead(6))
  {
    BLYNK_LOG("Button is pressed.");
    Blynk.notify("Yaaay... button is pressed!");
  }
  Blynk.run();
  timer.run();
}

