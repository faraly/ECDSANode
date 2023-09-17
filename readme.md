## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

```
private keys 

[
  '23b4fdeba8c7a9c3f5afb3f008670eb4e693815a84379b362fcaadf902f1c997',
  '5a5179169df6500dc6d4e432bcdfb30ab29e2dbb3efad345c4f84ea7443a4382',
  'e57d215a016a69bdefa7d02586bc98e9bbde6628cf72428173af225b86605cf7'
]
addresses
[
  '0284ab6bbe9241676db7463576c60573f35a7b08eb495a4b2c3a55901f4aa09349',
  '031266dadb81de507ccc9c24189a56451a4382369f3e95d743e57abdeb27c2efdd',
  '02f444ad255fc8dca4dff4cda61a50b8256c886f007a074ffd8c41b16a24c530b0'
]
```