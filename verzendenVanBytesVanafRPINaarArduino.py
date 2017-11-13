#! /usr/bin/python
 
import serial

bluetoothSerial = serial.Serial( "/dev/rfcomm1", baudrate=9600 )

    
bluetoothSerial.write("hello")
