#!/usr/bin/env python      
import Tkinter as tk       
import serial
bluetoothSerial = serial.Serial( "/dev/rfcomm3", baudrate=9600 )
heightNumber=500
widthNumber=500


def commandMethode(commando):
    
    bluetoothSerial.write(commando)

    

class Application(tk.Frame):              
    def __init__(self, master=None):
        tk.Frame.__init__(self, master, height=600, width=1000)
        
        self.grid()                       
        self.createWidgets()

    def createWidgets(self):
        vooruitButton=tk.Button(self, text='Vooruit', command=lambda:commandMethode("$vo"), width=20, height=5)
        vooruitButton.place(relx=0.3, rely=0.1)
        achteruitButton=tk.Button(self, text='Achteruit', command=lambda:commandMethode("$ac"), width=20, height=5)
        achteruitButton.place(relx=0.3, rely=0.5)
        linksButton=tk.Button(self, text='Links', command=lambda:commandMethode("$li"), width=20, height=5)
        linksButton.place(relx=0.1, rely=0.3)
        rechtsButton=tk.Button(self, text='Rechts', command=lambda:commandMethode("$re"), width=20, height=5)
        rechtsButton.place(relx=0.5, rely=0.3)
        opstartButton=tk.Button(self, text='Opstarten', command=lambda:commandMethode("$op"), width=5, height=2)
        opstartButton.place(relx=0.03, rely=0.03)
        afzettenButton=tk.Button(self, text='Afzetten', command=lambda:commandMethode("$af"), width=5, height=2)
        afzettenButton.place(relx=0.03, rely=0.1)
          

app = Application()                       
app.master.title('Sample application')    
app.mainloop()      






