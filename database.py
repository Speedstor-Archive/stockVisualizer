import socket
import pprint

tradeDATA = {}
pp = pprint.PrettyPrinter(indent=4)

def tradeDATA_putEarnings(dataObject):
    global tradeDATA
    if not "symbol" in dataObject:
        if not "s" in dataObject:
            return -1;

    if "s" in dataObject:
        dataObject["symbol"] = dataObject["s"]

    if not dataObject["symbol"] in tradeDATA:
        tradeDATA[dataObject["symbol"]] = {}

    symbol = dataObject["symbol"]

    for key in dataObject:
        if key == 'p':
            tradeDATA[symbol]['c'] = dataObject[key]
        else:
            tradeDATA[symbol][key] = dataObject[key]

def tradeDATA_putTrades(dataObject):
    tradeDATA_putEarnings(dataObject);

def tradeDATA_putQuote(symbol, dataObject):
    global tradeDATA
    # tradeDATA
    pp.pprint(symbol)
    if not symbol in tradeDATA:
        tradeDATA[symbol] = {}
    for key in dataObject:
        tradeDATA[symbol][key] = dataObject[key]

def getDatabase():
    global tradeDATA
    return tradeDATA