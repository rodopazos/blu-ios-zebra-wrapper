class App {
    constructor() {
        this._zebra = new Zebra();
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    get zebra() {
        return this._zebra;
    }

    onDeviceReady() {
        document.getElementById('deviceready').classList.add('ready');
    }
}

// ------------------------------------------------
//                      Main
// ------------------------------------------------
const app = new App();

const command = `
    ^XA
    ^FO50,50
    ^B8N,100,Y,N
    ^FD1234567
    ^FS
    ^XZ
`;

app.zebra.searchForPrinters()
    .then(printers => alert("searchForPrinters-done" + JSON.stringify(printers)))
    .catch(error => alert("searchForPrinters-error" + JSON.stringify(error)));

app.zebra.broadcastCommand(command)
    .then(result => alert("broadcastCommand-done" + JSON.stringify(result)))
    .catch(error => alert("broadcastCommand-error" + JSON.stringify(error)));






