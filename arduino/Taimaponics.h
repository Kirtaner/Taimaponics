// All your compile-time pinouts and device address settings!

// SainSmart relays are active low, change these if using active high relays
#define RELAY_ON 0
#define RELAY_OFF 1
#define ACTIVE_LOW 1

// Relay pins
#define Relay_1  12
#define Relay_2  11
#define Relay_3  10
#define Relay_4  9
#define Relay_5  8
#define Relay_6  7
#define Relay_7  6
#define Relay_8  5

// DHT temperature sensor type and pin
#define DHTTYPE DHT22
#define DHTPIN 2

// eTape liquid level sensor 
#define SERIESRESISTOR 560
#define NUMSAMPLES 5
#define SENSORPIN A0
#define FLAP 1
#define FUDGE 0.3
extern int samples[NUMSAMPLES];

// 1wire DS18B20 liquid temperature sensor pin
#define ONE_WIRE_BUS 3
