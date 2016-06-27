#include <ArduinoJson.h>
#include <SPI.h>
#include <Ethernet2.h>
#include <PubSubClient.h>
#include <Wire.h>
#include "Adafruit_LEDBackpack.h"
#include "Adafruit_GFX.h"

const char *BROKER = "192.168.77.171";
const char *topic = "$DEVICE/Barry/environment";
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

//IPAddress ip(192, 168, 1, 177);
IPAddress ip(192, 168, 78, 121);
IPAddress server(192,168,77,171);
Adafruit_8x8matrix matrix = Adafruit_8x8matrix();
EthernetClient ethernetClient;
PubSubClient pubsubClient(ethernetClient);
StaticJsonBuffer<200> jsonBuffer;
JsonObject& jsonPayload = jsonBuffer.createObject();

void toMatrix(String message){
  
  int len = int(message.length());
  
  for (int8_t x=8; x>=-8*len; x--) {
    matrix.clear();
    matrix.setCursor(x,0);
    matrix.print(message);
    matrix.writeDisplay();
    delay(100);
  }
}


void setup() {
  
  Serial.begin(9600);
  
  Ethernet.begin(mac,ip);
  pubsubClient.setServer(server, 1883);
  
  
  matrix.setTextSize(1);
  matrix.setTextWrap(false);  // we dont want text to wrap so it scrolls nicely
  matrix.setTextColor(LED_ON);
  matrix.setRotation(1);
  matrix.begin(0x70);  // pass in the address

  delay(1500);
   
  Serial.begin(9600);
  Serial.println(Ethernet.localIP());
  
}

void reconnect(){

  Serial.print("Reconnecting");
  char payload[256];
  jsonPayload.printTo(payload, sizeof(payload));

  toMatrix("AWS");
  
  while(!pubsubClient.connected()){
    if( pubsubClient.connect("Barry") ){
      Serial.println("-------CONNECTED");
      pubsubClient.publish(topic,payload);
      pubsubClient.subscribe(topic);
      Serial.println(payload);
    }else{
      Serial.println("-------DISCONNECTED");
      delay(5000);
    }
  }
}

void loop() {
  int _co = analogRead(A3);
  int _methane = analogRead(A1);
  int _humidity = digitalRead(2);
  int _light = analogRead(A0);

  jsonPayload["humidity"] = _humidity;
  jsonPayload["light"] = _light;
  jsonPayload["methane"] = _methane;
  jsonPayload["co"] = _co;

  if( !pubsubClient.connected() ){
    reconnect();
  }
  pubsubClient.disconnect();
  pubsubClient.loop();

  Serial.println("-------LOOP END");
  
}
