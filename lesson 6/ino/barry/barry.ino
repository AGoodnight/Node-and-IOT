/*
// BoxBot - PlantBuddy Source Code
*/
#include <SPI.h>
#include <Ethernet2.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_BMP085.h>
#include <ArduinoJson.h>

// defines and variable for sensor/control mode
#define DEBUG 1
#define MODE_OFF    0  // Motion not detected
#define MODE_ON     1  // Motion detected
// ------------------- Method Dependencies -----------------
// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 177);
StaticJsonBuffer<200> jsonBuffer;
const char *BROKER = "192.168.1.79";
//const char *BROKER = "192.168.77.163";

// ------------------- Ethernet Server -----------------
// Initialize the Ethernet server library
// with the IP address and port you
Adafruit_BMP085 bmp;
EthernetClient ethernetClient;
PubSubClient pubsubClient(ethernetClient);
char pubString[] = "";
char message_buff[] = "";


// ------------------- Device Methods -----------------
void PubSubClientCallback(char* topic, byte* payload, long unsigned length){
}

// ------------------- Device Routine -----------------
void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  // start the Ethernet connection and the server:


  Ethernet.begin(mac, ip);
  
  pinMode(A0,INPUT);
  Serial.begin(9600);
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());
  bmp.begin();
  
  pubsubClient.setServer(BROKER,3000);
  pubsubClient.setCallback(PubSubClientCallback);

  // Allow the hardware to sort itself out
  delay(1500);
}

void reconnect() {
  
  String moisture = sensorRead(A0);
  String light = sensorRead(A3);
  String temperature= String( bmp.readTemperature() );
  String sea_level_pressure = String( bmp.readSealevelPressure() );
  String pressure = String( bmp.readPressure() );
  
  char packetBuffer[256] = "";

  Serial.println("Sensors Read");
  Serial.println(light);
  Serial.println(moisture);
  Serial.println(temperature);

  JsonObject& root = jsonBuffer.createObject();
  root["moisture"] = moisture;
  root["light"] = light;
  root["temperature"] = temperature;
//  root["sea_level_pressure"] = sea_level_pressure;
  root["pressure"] = pressure;
  root.printTo(packetBuffer,sizeof(packetBuffer));

  String packet = String(packetBuffer);

  //Serial.println(packet);
  Serial.println("Starting PubSub");
 
  while (!pubsubClient.connected()) {
    if (pubsubClient.connect("Barry")) {
      //pubsubClient.subscribe("office/plant/environment"); 
      if(pubsubClient.publish("$SENSOR/office/plant/environment", packetBuffer )){
        Serial.print("published:");
        Serial.println(packetBuffer);
      }else{
        Serial.println("Did not publish, too large perhaps");
      }
    }
    delay(1000);
    pubsubClient.disconnect();
  }
}

String sensorRead(int in){
  int sensorReading = analogRead(in);
  String reading = String(sensorReading);
  return reading;
}

void loop() {
  
    if (!pubsubClient.connected()) {
     reconnect();
    }
    
    pubsubClient.loop();
  

}
