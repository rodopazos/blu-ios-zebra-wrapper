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
                resolve({ printerSerialNumber, result });
            }, error => {
                reject({ printerSerialNumber, error });
            })
        });
    }

    broadcastCommand(cmd) {
        if (this._connectedPrinters.length > 0) {
            let broadcast = [];

            this._connectedPrinters.forEach(p => {
                broadcast.push(this.sendCommand(p.serialNumber, cmd));
            });
            return Promise.all(broadcast);
        }
        return Promise.reject("Not connected printers");
    }

    buildTextCmd(scheme) {
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ^AD${scheme.font},${scheme.fontHeight},${scheme.fontWidth}
            ^FD${scheme.data}
            ^FS
        `;
    }

    buildBarcodeCmd(scheme) {
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ^${scheme.bar}N,N,${scheme.barHeight},N,N
            ^FD${scheme.data}
            ^FS
        `;
    }

    buildBoxCmd(scheme) {
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ^GB${scheme.boxWidth},${scheme.boxHeight},N,1,B,0
            ^FD${scheme.data}
            ^FS
        `;
    }
}