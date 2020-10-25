token = 'token_secret'

import database
import socket
import pprint
import websocket
import threading
from handleRequest import *
import FinnhubWebsocket

pp = pprint.PrettyPrinter(indent=4)

global finnhub_websocket
finnhub_websocket = None

class HTTPHandler:
    def get(self, args, type):
        if args == '/':
            args = '/index.html'
            fin = open('website' + args)
        if type != "image":
            fin = open('website/' + args)

        if type == "image":
            fin = open('website/' + args, 'rb')

        # Read file contents
        content = fin.read()
        fin.close()
        return content

def handle_request(request):
    http = HTTPHandler

    if not "\r\n\r\n" in request: return None

    try:
        bodySeperatorIndex = request.index("\r\n\r\n")
        # Parse headers
        headers = request[:bodySeperatorIndex].split("\n")

        # Parse body
        body = request[bodySeperatorIndex+4:]
        if(len(headers) > 1):
            get_content = headers[0].split()

            # accept = headers[6].split()
            # type_content = accept[1].split('/')
            requestUrl = get_content[1]
            if "?" in requestUrl:
                requestUrl = requestUrl[:requestUrl.index("?")]

            print(f"Request: {get_content[1]}")
            if requestUrl == "/recieve":
                return webhook_data(headers, body);
            elif requestUrl == "/getData":
                return json.dumps(database.getDatabase()).encode()
            elif requestUrl == "/add":
                return "not implemented"
            else:
                try:
                    # Filename
                    filename = requestUrl

                    if get_content[0] == "GET":
                        # content = http.get(None, requestUrl, type_content[0])
                        content = http.get(None, requestUrl, 'image')
                        return content
                except FileNotFoundError:
                    return None
    except Error:
        return None

def commandLine():
    global finnhub_websocket
    while True:
        inputString = input()
        cutIndex = -1
        command = ""
        if " " in inputString:
            cutIndex = inputString.index(" ")
            command = inputString[:cutIndex]
        else:
            command = inputString

        if "printDatabase" == command:
            tradeDATAObj = database.getDatabase()
            pp.pprint(tradeDATAObj)
        elif "startupSymbols" == command:
            # add_symbol(finnhub_websocket, "BINANCE:BTCUSDT")
            add_symbol(finnhub_websocket, "AMZN")
            add_symbol(finnhub_websocket, "AAPL")
            add_symbol(finnhub_websocket, "MSFT")
            add_symbol(finnhub_websocket, "AMZN")
            add_symbol(finnhub_websocket, "V")
            add_symbol(finnhub_websocket, "BABA")
            add_symbol(finnhub_websocket, "WMT")
            add_symbol(finnhub_websocket, "DIS")
            add_symbol(finnhub_websocket, "KO")
            add_symbol(finnhub_websocket, "NKE")
            add_symbol(finnhub_websocket, "HSBC")
            add_symbol(finnhub_websocket, "MCD")
        elif "addSymbol" == command:
            if cutIndex > 0:
                add_symbol(finnhub_websocket, inputString[cutIndex+1:])
                print(f"> Added {inputString[cutIndex+1:]}")
        elif "printSubscription" == command:
            pp.pprint(getSubscription())
        elif "testBlock" == command:
            print(finnhub_websocket)
        elif "printWebhooks" == command:
            print(list_webhooks())
        elif "websocketResub" == command:
            finnhub_websocket.resubscribe()
            print(f"resub {finnhub_websocket.symbols}")
        elif "cleanWebhooks" == command:
            clean_webhooks()
        elif "startWebsocket" == command:
            websocketThread = threading.Thread(target=startWebsocket__, args=())
            websocketThread.start()
        elif "stopWebsocket" == command:
            finnhub_websocket.stop()
        elif "getSymbols" == command:
            print(finnhub_websocket.getSymbols())

def startWebsocket():
    global finnhub_websocket
    print(finnhub_websocket)
    finnhub_websocket = FinnhubWebsocket.FinnhubWebsocket(token)
    finnhub_websocket.start()

def startWebsocket__():
    global finnhub_websocket
    print(finnhub_websocket)
    finnhub_websocket.start()

def socketThread(client_connection, client_address):
    request_data = client_connection.recv(1024).decode('utf-8')

    content = handle_request(request_data)

    # Send HTTP response
    if content:
        response = b'HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: *\n\n'
        response += content
    else:
        response = b'HTTP/1.1 404 NOT FOUND\n\nFile Not Found'

    client_connection.sendall(response)
    client_connection.close()


HOST, PORT = '', 88
if __name__ == '__main__':
    # websocket
    websocketThread = threading.Thread(target=startWebsocket, args=())
    websocketThread.start()

    #thread for handling input
    commandLineThread = threading.Thread(target=commandLine, args=())
    commandLineThread.start()

    listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    listen_socket.bind((HOST, PORT))
    listen_socket.listen(1)
    print(f'Serving HTTP on port {PORT} ...')
    while True:
        try:
            client_connection, client_address = listen_socket.accept()

            requestThread = threading.Thread(target=socketThread, args=(client_connection, client_address))
            requestThread.start()

        except Error:
            print("error recieving socket and request")

