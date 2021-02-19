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

        const txtCmdScheme = {
            xOrigin: 50,
            yOrigin: 50,
            font: 'N',
            fontHeight: 36,
            fontWidth: 20,
            data: 'Jose Marti el mejor !!!'
        };
        const txtCmd = `^XA${this.zebra.buildTextCmd(txtCmdScheme)}^XZ`;

        this.zebra.searchForPrinters()
            .then(printers => {
                alert("searchForPrinters-done" + JSON.stringify(printers));

                this.zebra.broadcastCommand(txtCmd)
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






