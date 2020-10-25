import websocket
import json
import pprint
import database

pp = pprint.PrettyPrinter(indent=4)

class FinnhubWebsocket:
    def __init__(self, token):
        self.token = token
        self.symbols = []
        # websocket.enableTrace(True)

    def start(self):
        self.ws = websocket.WebSocketApp("wss://ws.finnhub.io?token="+self.token,
                                  on_message = on_message,
                                  on_error = on_error,
                                  on_close = on_close)
        self.ws.on_open = on_open
        self.ws.run_forever()

    def stop(self):
        self.ws.close();
        print("### FinnhubWebsocket closed ###")

    def addSymbol(self, symbol):
        self.symbols.append(symbol)
        self.ws.send('{"type":"subscribe","symbol":"' + symbol + '"}')

    def addSymbolInternal(self, symbol):
        self.ws.send('{"type":"subscribe","symbol":"' + symbol + '"}')

    def getSymbols(self):
        return self.symbols

    def resubscribe(self):
        for symbol in self.symbols:
            self.addSymbolInternal(symbol)
            print(f"resub {symbol}")


def on_message(ws, message):
    messageObject = json.loads(message)
    if "data" in messageObject:
        for item in messageObject["data"]:

            database.tradeDATA_putTrades(item)
    try:
        with open("./writeDocs/websocket.txt", "a") as f:
            f.write(message+"\n")
    except:
        print("file write error")
    # pp.pprint(messageObject);

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### FinnhubWebsocket closed ###")

def on_open(ws):
    print("## websocket opened ##")
    # ws.send('{"type":"subscribe","symbol":"AAPL"}')

