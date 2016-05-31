#define NUMBER_VARIABLES 2
#define NUMBER_FUNCTIONS 1

#include <Adafruit_CC3000.h>
#include <SPI.h>
#include <CC3000_MDNS.h>
#include <aREST.h>

#define ADAFRUIT_CC3000_IRQ  3 // MUST be an interrupt pin!
#define ADAFRUIT_CC3000_VBAT 5 // These can be
#define ADAFRUIT_CC3000_CS  10 // any two pins.


#define WLAN_SSID "yourNetwork"
#define WLAN_PASS "yourPassword"
#define WLAN_SECURITY WLAN_SEC_WPA2

Adafruit_CC3000 cc3000 = Adafruit_CC3000(
	ADAFRUIT_CC3000_CS, 
	ADAFRUIT_CC3000_IRQ, 
	ADAFRUIT_CC3000_VBAT,
	SPI_CLOCK_DIV2
);

Adafruit_CC3000_Server restServer(80);
aREST rest = aREST();

#define LISTEN_PORT           80

void setup(){
	int moisture;

	rest.variable("moisture",A1);

	cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY);

	rest.begin();
	displayConnectionDetails();

	Adafruit_CC3000_ClientRef client = restServer.available();
	rest.handle(client);
}
