from database import *
import requests
import pprint
import json

pp = pprint.PrettyPrinter(indent=4)

subscribed_list = {} # {symbol: webhook_id}

def getSubscription():
    global subscribed_list
    return subscribed_list

def webhook_data(headers, request):
    # check if it is from the right server
    ifContainHeader = False
    for header in headers:
        if "X-Finnhub-Secret" in header:
            ifContainHeader = True
            if not "brnsj9frh5reu6jte050" in header:
                return None
    if not ifContainHeader: return None

    requestJson = json.loads(request)

    if "data" in requestJson:
        for dataItem in requestJson["data"]:
            tradeDATA_putEarnings(dataItem)

    return b'{"success": true}'

def add_symbol(finnhub_websocket, symbol):
    if not symbol in subscribed_list:
        # Register new webhook for earnings
        r_webhook = requests.post('https://finnhub.io/api/v1/webhook/add?token=token_secret', json={'event': 'earnings', 'symbol': symbol})
        res = r_webhook.json()
        print(res)
        subscribed_list[symbol] = {}
        subscribed_list[symbol]["webhook"] = res

        # add it to websocket
        finnhub_websocket.addSymbol(symbol)

        # get quote
        r_quote = requests.get('https://finnhub.io/api/v1/quote?symbol='+symbol+'&token=token_secret')
        quoteObject = r_quote.json()
        print(quoteObject)
        
        # put quote in database
        tradeDATA_putQuote(symbol, quoteObject)

def list_webhooks():
    # List webhook
    r = requests.get('https://finnhub.io/api/v1/webhook/list?token=token_secret')
    res = r.json()
    return res

def delete_symbol(symbol):
    #Delete webhook
    webhook_id = subscribed_list[symbol]["webhook"]["id"]
    r = requests.post('https://finnhub.io/api/v1/webhook/delete?token=token_secret', json={'id': webhook_id})
    res = r.json()
    print(res)

def clean_webhooks():
    r = requests.get('https://finnhub.io/api/v1/webhook/list?token=token_secret')
    res = r.json()
    for object in res:
        r = requests.post('https://finnhub.io/api/v1/webhook/delete?token=token_secret', json={'id': object["id"]})
        print(f"deleted {object['symbol']}")
    #


