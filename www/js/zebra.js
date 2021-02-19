/*
    Plugin https://github.com/adriangrana/cordova-zebra-printer.git
    is nedded.
*/

class Zebra {
    constructor() {
        this._connectedPrinters = [];
    }

    searchForPrinters() {
        return new Promise((resolve, reject) => {
            zebra.scan(printers => {
                this._connectedPrinters = printers;
                resolve(printers);
            }, error => {
                this._connectedPrinters = [];
                reject(error);
            });
        });
    }
}