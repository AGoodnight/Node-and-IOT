/*
// BoxBot - PlantBuddy Source Code
*/
#include <SPI.h>
#include <Adafruit_CC3000.h>
#include <ccspi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_BMP085.h>
//#include <ArduinoJson.h>

// These are the interrupt and control pins
#define ADAFRUIT_CC3000_IRQ   3  // MUST be an interrupt pin!
// These can be any two pins
#define ADAFRUIT_CC3000_VBAT  5
#define ADAFRUIT_CC3000_CS    10
// Use hardware SPI for the remaining pins
// On an UNO, SCK = 13, MISO = 12, and MOSI = 11
Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT,
                                         SPI_CLOCK_DIVIDER); // you can change this clock speed

#define WLAN_SSID       "ATT121"           // cannot be longer than 32 characters!
#define WLAN_PASS       "9804522874"
// Security can be WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA or WLAN_SEC_WPA2
#define WLAN_SECURITY   WLAN_SEC_WPA2

#define IDLE_TIMEOUT_MS  3000  

// ------------------- Device Pointers -----------------
int temperature;
int pressure;
int altitude;
int motion;
int delayTime = 500;
char pubString[] = "";
char message_buff[] = "";

// ------------------- Device Methods -----------------
void threadCallback(){
  Serial.println("Thread executed");
}

void PubSubClientCallback(char* topic, byte* payload, long unsigned length){
  
  int i = 0;

  Serial.println("Message arrived to server");
  Serial.println("topic: " + String(topic));
  Serial.println("Length: " + String(length,DEC));
  
  
  // create character buffer with ending null terminator (string)
  for(i=0; i<length; i++) {
    message_buff[i] = payload[i];
  }
  message_buff[i] = '\0';
}


// ------------------- Method Dependencies -----------------
// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:

//StaticJsonBuffer<200> jsonBuffer;
const char *BROKER = "192.168.77.163";
uint32_t wifi_ip;

// ------------------- Ethernet Server -----------------
// Initialize the Ethernet server library
// with the IP address and port you
Adafruit_BMP085 bmp;
Adafruit_CC3000_Client client;
PubSubClient pubsubClient(BROKER,3000,PubSubClientCallback,client);



// ------------------- Device Routine -----------------
void setup() {

  // Light and Moisture Sensors 
  pinMode(A0,INPUT);
  pinMode(A3,INPUT);
  
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  // start the wifi connection and the server:
  
  // -------------------------------------------------------------
  // INIT WIFI CLIENT --------------------------------------------
  // -------------------------------------------------------------
  Serial.println(F("\nInitializing..."));
  //if(!cc3000.begin()){
  cc3000.begin();
    Serial.println("Could not begin cc3000"); 
//    while(1);
//  }
  Serial.print(F("\nAttempting to connect to ")); Serial.println(WLAN_SSID);
  if (!cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY)) {
    Serial.println(F("Failed!"));
    while(1);
  }
  Serial.println(F("Connected!"));
  Serial.println(F("Request DHCP"));
  while (!cc3000.checkDHCP())
  {
    delay(100); // ToDo: Insert a DHCP timeout!
  }  

  /* Display the IP address DNS, Gateway, etc. */  
  displayConnectionDetails();

  pubsubClient.setServer(BROKER,3000);
  pubsubClient.setCallback(PubSubClientCallback);

  // Allow the hardware to sort itself out
  delay(1500);
}

void reconnect() {

  Serial.println("Reconnecing");

  String moisture = sensorRead(A0);
  String light = sensorRead(A3);
  String temparture = String( bmp.readTemperature() );
  String sea_level_pressure = String( bmp.readSealevelPressure() );
  String pressure = String( bmp.readPressure() );
  
  char packetBuffer[] = "";

  Serial.println("Sensors Read");

//  JsonObject& root = jsonBuffer.createObject();
//  root["moisture"] = moisture;
//  root["light"] = light;
//  root["temparture"] = temparture;
//  root["sea_level_pressure"] = sea_level_pressure;
//  root["pressure"] = pressure;
//  root.printTo(packetBuffer,sizeof(packetBuffer));

  String packet = String(packetBuffer);

  Serial.println(packet);

  while (!pubsubClient.connected()) {
    if (pubsubClient.connect("Barry")) {
      //start a thread here
      pubsubClient.subscribe("office/plant/environment");
      packet.toCharArray(message_buff, packet.length()+1); 
      
      pubsubClient.publish("office/plant/environment", message_buff );
      pubsubClient.disconnect();
    }else{
      delay(500);
    }
  }
}

String sensorRead(int in){
  int sensorReading = analogRead(A0);
  String reading = String(sensorReading);
  return reading;
}

bool displayConnectionDetails(void)
{
  Serial.println("SHowing" );
  uint32_t ipAddress, netmask, gateway, dhcpserv, dnsserv;
  
  if(!cc3000.getIPAddress(&ipAddress, &netmask, &gateway, &dhcpserv, &dnsserv))
  {
    Serial.println(F("Unable to retrieve the IP Address!\r\n"));
    return false;
  }
  else
  {
    Serial.print(F("\nIP Addr: ")); cc3000.printIPdotsRev(ipAddress);
    Serial.print(F("\nNetmask: ")); cc3000.printIPdotsRev(netmask);
    Serial.print(F("\nGateway: ")); cc3000.printIPdotsRev(gateway);
    Serial.print(F("\nDHCPsrv: ")); cc3000.printIPdotsRev(dhcpserv);
    Serial.print(F("\nDNSserv: ")); cc3000.printIPdotsRev(dnsserv);
    Serial.println();
    return true;
  }
}

void loop() {

    if (!pubsubClient.connected()) {
     //reconnect();
    }
    
    pubsubClient.loop();
  

}
