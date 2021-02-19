/*
    Plugin https://github.com/adriangrana/cordova-zebra-printer.git
    is nedded.
*/

class Zebra {
    constructor() {
        this._connectedPrinters = [];
    }

    get connectedPrinters() {
        return this._connectedPrinters;
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

    sendCommand(printerSerialNumber, cmd) {
        return new Promise((resolve, reject) => {
            zebra.write(printerSerialNumber, cmd, result => {
                resolve(result);
            }, error => {
                reject(error);
            })
        });
    }

    broadcastCommand(cmd) {
        if (this._connectedPrinters.length > 0) {
            let broadcast = [];
            let rejected = [];

            this._connectedPrinters.forEach(p => {
                broadcast = [...new Promise((resolve, reject) => {
                    zebra.write(p.serialNumber, cmd, result => {
                        resolve({ printer: p, result });
                        resolved.push({ printer: p, result });
                    }, error => {
                        reject({ printer: p, error });
                        rejected.push({ printer: p, error });
                    });
                })];
            });
            return Promise.all(broadcast).then(result => resolve(result)).catch(() => resolve(rejected));
        }
    }
}