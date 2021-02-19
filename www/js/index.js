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

        const command = `
            ^XA
            ^FO50,50
            ^B8N,100,Y,N
            ^FD1234567
            ^FS
            ^XZ
        `;
        this.zebra.searchForPrinters()
            .then(printers => {
                alert("searchForPrinters-done" + JSON.stringify(printers));

                // this.zebra.sendCommand(this.zebra.connectedPrinters[0].serialNumber, command)
                //     .then(result => alert("sendCommand-done" + JSON.stringify(result)))
                //     .catch(error => alert("sendCommand-error" + JSON.stringify(error)));

                this.zebra.broadcastCommand(command)
                    .then(result => alert("broadcastCommand-done" + JSON.stringify(result)))
                    .catch(error => alert("broadcastCommand-error" + JSON.stringify(error)));
            })
            .catch(error => alert("searchForPrinters-error" + JSON.stringify(error)));




    }
}

// ------------------------------------------------
//                      Main
// ------------------------------------------------
const app = new App();






