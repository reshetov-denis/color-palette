import keyboard
import eel

eel.init("media")

@eel.expose
def exitApp():
	keyboard.send("alt+f4")

eel.start("index.html")