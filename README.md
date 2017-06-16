# Taimaponics

[![Build Status](https://travis-ci.org/Kirtaner/Taimaponics.svg?branch=master)](https://travis-ci.org/Kirtaner/Taimaponics) [![Coverage Status](https://coveralls.io/repos/github/Kirtaner/Taimaponics/badge.svg)](https://coveralls.io/github/Kirtaner/Taimaponics)

Taimaponics is an Angular 2 + Node.js + Arduino hydroponics controller intended for use with various sensors and relays to automatically and remotely manage your indoor garden environment. It is designed to run on a Raspberry Pi 2 or 3 as a master, with an Arduino connected via serial as a slave. The Node application sends commands to the Arduino to retrieve sensor data, toggle 120v relays on and off to control light cycles, fans, water pumps and more.

Electrical and wiring diagrams are forthcoming.

## Current Arduino hardware

- Arduino Uno or similar
- DS18B20 temperature sensor
- DHT20 temperature and humidity sensor
- SainSmart 8 relay board
- Milone eTape liquid level sensor (12 inch)

These are general guidelines of the hardware being used. Components can be substituted and implemented on the Arduino side as long as the data output conforms to the existing serial protocol expected by the Node controller.

## How to build the application

- Clone the repository
- edit ./.env.example
- edit ./config/development.json 
- `npm install`
- `npm install -g @angular/cli`
- `ng build`
- `node app.js`

You can now connect to the Node server. The Arduino and sensor hardware is not required to run the application, by default there is a mock serial service simulating the Arduino output for development and test use, as long as the following is set in `./config/development.json`.

~~~~
"Serial": {
  "enabled": 0
}
~~~~
