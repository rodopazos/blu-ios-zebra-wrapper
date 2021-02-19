class App {
    constructor() {
        alert("constructor");
        this._zebra = new Zebra();
    }

    init() {
        alert("init");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    onDeviceReady() {
        alert("onDeviceReady");
        document.getElementById('deviceready').classList.add('ready');

        this._zebra.searchForPrinters()
            .then(printers => alert(JSON.stringify(printers)))
            .catch(error => alert(JSON.stringify(error)));
    }
}

// ------------------------------------------------
//                      Main
// ------------------------------------------------
let app = new App();

app.init();






