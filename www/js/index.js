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
            fontHeight: 50,
            fontWidth: 100,
            data: 'Jose Marti'
        };
        const barCmdScheme = {
            xOrigin: 50,
            yOrigin: 120,
            bar: 'B3',
            barHeight: 50,
            data: '28-01-1853'
        };
        const boxCmdScheme = {
            xOrigin: 50,
            yOrigin: 140,
            boxWidth: 200,
            boxHeight: 200
        };
        const txtCmd = `^XA${this.zebra.buildTextCmd(txtCmdScheme)}^XZ`;
        const barCmd = `^XA${this.zebra.buildBarcodeCmd(barCmdScheme)}^XZ`;
        const boxCmd = `^XA${this.zebra.buildBoxCmd(boxCmdScheme)}^XZ`;
        const allCmd = `
            ^XA
                ${this.zebra.buildBarcodeCmd(txtCmdScheme)}
                ${this.zebra.buildBarcodeCmd(barCmdScheme)}
                ${this.zebra.buildBoxCmd(boxCmdScheme)}
            ^XZ`;

        this.zebra.searchForPrinters()
            .then(printers => {
                alert("searchForPrinters-done" + JSON.stringify(printers));

                this.zebra.broadcastCommand(allCmd)
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






