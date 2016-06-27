from Naked.toolshed.shell import execute_js, muterun_js
import RPi.GPIO as GPIO
import time
import os

# Establish 
GPIO.setmode(GPIO.BCM)
GPIO.setup(21,GPIO.OUT)
GPIO.setup(20,GPIO.OUT)
GPIO.setup(19,GPIO.OUT)
GPIO.setup(13,GPIO.OUT)

# We are starting the Script
GPIO.output(21,1)
print("Booting Broker, do not disconnect power! Only use Shutdown Button!")

# Now we need to start Broker
success = execute_js('server_mqtt.js')
if success:
	print("SUCCESS Starting Broker")
	GPIO.output(20,1)
else:
	print("ERROR Starting Broker")

# Establish a Shutdown Button
GPIO.setup(4, GPIO.IN,pull_up_down=GPIO.PUD_UP)
while True:
	print GPIO.input(4)
	if(GPIO.input(4) == False):
		os.system("sudo shutdown -h now")
		break
	time.sleep(1)


