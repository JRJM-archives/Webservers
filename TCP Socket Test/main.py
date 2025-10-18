# import socket module
from socket import *
import os
import sys

# Quick TCP connection socket tool :)

print("Currently working in directory: ", os.getcwd())

# initialize socket host IP and port (local)
HOST = "127.0.0.1"
PORT = 65432

serverSocket = socket(AF_INET, SOCK_STREAM)

# binds it to the ip and port
serverSocket.bind((HOST, PORT))

# listen for connections one at a time (basically listening for a client or a browser like Firefox)
serverSocket.listen()

print("Server is running on http://127.0.0.1:65432/")

try:
    while True:
        print('Waiting for connection...')
        # wait for the client to connect then accept that connection, get a new socket for it
        connectionSocket, addr = serverSocket.accept()
        print('Connection established from:', addr)
        try:
            # read messages with a max byte size of 1024
            message = connectionSocket.recv(1024).decode('utf-8', errors='ignore')

            # get file and split the request on whitespace and get the second token (like /index.html)
            filename = message.split()[1]

            if filename == "/":
                filename = "/index.html"

            # open the file and read it
            f = open(filename[1:])

            outputdata = f.read()
            f.close()

            # creating header string
            header = (
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: text/html\r\n"
                "\r\n"
            )

            # sending that header string and the file data
            connectionSocket.send(header.encode('utf-8'))
            connectionSocket.sendall(outputdata.encode('utf-8'))

        except IOError:
            # error handling if the file isn't found
            header = "HTTP/1.1 404 Not Found\r\n\r\n"
            response = "<html><head><title>404 Not Found</title></head><body><h1>File Not Found</h1></body></html>"
            connectionSocket.send(header.encode('utf-8'))
            connectionSocket.send(response.encode('utf-8'))

        finally:
            # close the connection
            connectionSocket.close()

except KeyboardInterrupt:
    # if a keyboard input is detected close the server
    print('\nServer stopped by user')
    serverSocket.close()
    sys.exit()
