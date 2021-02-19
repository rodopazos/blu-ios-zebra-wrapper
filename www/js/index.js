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
let app = new App();

app.zebra.searchForPrinters()
    .then(printers => alert("searchForPrinters-done" + JSON.stringify(printers)))
    .catch(error => alert("searchForPrinters-error" + JSON.stringify(error)));

app.zebra.broadcastCommand()
    .then(result => alert("broadcastCommand-done" + JSON.stringify(result)))
    .catch(error => alert("broadcastCommand-error" + JSON.stringify(error)));






