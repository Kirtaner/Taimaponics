// Taimaponics hydroponic controller sketch
// Thanks to @magicalkittymyn for rewriting segments of the serial protocol

#include <Arduino.h>
#include <EEPROM.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>
#include "Taimaponics.h"

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);
// Assign the addresses of your 1-Wire temp sensors.
DeviceAddress reservoir = { 0x28, 0xE6, 0xA6, 0x5C, 0x07, 0x00, 0x00, 0x9A };

// Init DHT
DHT dht(DHTPIN, DHTTYPE, 60);

/*
 Return current relay states from EEPROM
 */
bool * getRelayState()
{
  static bool relayState[8];

  for (int memoryAddr=0; memoryAddr <= 7; memoryAddr++)
  {
    relayState[memoryAddr] = EEPROM.read(memoryAddr);
  }

  return relayState;
}

int relayId[8];

void setup(void)
{
  // start serial port
  Serial.begin(115200);
  Serial.setTimeout(100);

  // Start up the 1wire library
  sensors.begin();
  // set the resolution to 10 bit (good enough?)
  sensors.setResolution(reservoir, 10);
  // start the DHT
  dht.begin();

  analogReference(EXTERNAL);

  // load relay state from eeprom
  bool *relayState;
  relayState = getRelayState();

  for(int i=0;i<8;i++){
    relayId[i]=12-i;
    digitalWrite(relayId[i], relayState[i]);
    pinMode(relayId[i], OUTPUT);
  }
}

/*
  Grab the reservoir temp from 1wire sensor
 */
float getLiquidTemperature()
{
  sensors.requestTemperatures();
  float tempC = sensors.getTempC(reservoir);
  if (tempC == -127.00) {
    return 0;
  } else {
    return tempC;
  }
}

/*
  Grab the environment temp and humidity from DHT22 sensor
 */
float getEnvironmentHumidity()
{
  float h = dht.readHumidity();

  if (isnan(h)) {
    return 0;
  } else {
    return h;
  }
}

float getEnvironmentTemperature()
{
  float t = dht.readTemperature();

  if (isnan(t)) {
    return 0;
  } else {
    return t;
  }
}

void getAllSensors()
{
  float eTemp = getEnvironmentTemperature();
  float eHumidity = getEnvironmentHumidity();
  float liquidTemp = getLiquidTemperature();
  bool *relayState;
  relayState = getRelayState();

  String output = "";
  output += eTemp; output += " ";
  output += eHumidity; output += " ";
  output += liquidTemp; output += " ";

  for (int i = 0; i <= 7; i++)
  {
    if(ACTIVE_LOW)
    {
      output += !relayState[i];
    }
    else
    {
      output += relayState[i];
    }
  }

  Serial.println(output);
  Serial.flush();
  return;
}

/*
  Grab the current reservoir water level. MATH!
  Lost the calculation algorithm with a power outage. FML.
 */
// float getWaterLevel()
// {
  // uint8_t i;
  // float average;
  // float waterlevel;
  // float lastwaterlevel=0;
  // // take N samples in a row, with a slight delay
  // for (i=0; i< NUMSAMPLES; i++) {
  //   samples[i] = analogRead(SENSORPIN);
  //   delay(10);
  // }

  // // average all the samples out
  // average = 0;
  // for (i=0; i< NUMSAMPLES; i++) {
  //   average += samples[i];
  // }
  // average /= NUMSAMPLES;
  // // convert the value to resistance
  // average = 1023 / average - 1;
  // average = SERIESRESISTOR / average;
  // waterlevel = 0;

  // waterlevel= -1 * 0.006958 * average + 11.506958+ FUDGE;
  // if (lastwaterlevel<(waterlevel-FLAP)||lastwaterlevel>(waterlevel+FLAP))
  // {
  //   Serial.print("Water level (inches) ");
  //   Serial.println(waterlevel);
  // }

  // lastwaterlevel=waterlevel;
// }

void loop(void){
  //Verify connection by serial
  if(Serial.available() > 0) {
    String serialIn = Serial.readString();
    for(int off=0; off < serialIn.length() - 1; off += 2){
      int mode = 255;

      //set up vars depending on command type
      if(serialIn[off] == 'o'){
        mode = RELAY_ON;
      } else if(serialIn[off] == 'c'){
        mode = RELAY_OFF;
      } else {
        off -= 1; //ensure next iteration we've only moved ahead 1, to search for one of the commands.
      }

      if(mode < 255){ //check to ensure we have a valid command
        int pin = serialIn[off+1] - '1'; // use char math to calculate offset
        digitalWrite(relayId[pin], mode);
        EEPROM.update(pin, mode);
      }
    }
  }
}
