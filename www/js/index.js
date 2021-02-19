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
            ^ADN,36,20
            ^FDJose Marti
            ^FS 
            ^XZ
        `;
        this.zebra.searchForPrinters()
            .then(printers => {
                alert("searchForPrinters-done" + JSON.stringify(printers));

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






