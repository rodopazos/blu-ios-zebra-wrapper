/*
    Nedded Plugin:
        - https://github.com/adriangrana/cordova-zebra-printer.git
        - https://github.com/don/BluetoothSerial
*/

class Zebra {
    constructor() {
        this._connectedPrinters = [];
    }

    get connectedPrinters() {
        return this._connectedPrinters;
    }

    get bluetoothConnection() {
        return bluetoothSerial;
    }

    getBluetoothList() {
        return new Promise((resolve, reject) => {
            bluetoothSerial.list(res => {
                resolve(res);
            }, () => {
                reject(null);
            });
        });
    }

    bluetoothConnect(mac) {
        return new Promise((resolve, reject) => {
            bluetoothSerial.connect(mac, res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    }

    writeBytes(data) {
        return new Promise((resolve, reject) => {
            bluetoothSerial.write(data, res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    }

    isBluetoothConnected() {
        return new Promise((resolve, reject) => {
            bluetoothSerial.isConnected(() => {
                resolve(true);
            }, () => {
                reject(false);
            });
        });
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
            ^A${scheme.font}N,${scheme.fontHeight},${scheme.fontWidth}
            ^FD${scheme.data}
            ^FS
        `;
    }

    buildBlockTextCmd(scheme) {
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ^A${scheme.font}N,${scheme.fontHeight},${scheme.fontWidth}
            ^FB${scheme.fontWidth},b,c,d,e
            ^FD${scheme.data}
            ^FS
        `;
    }

    buildBarcodeCmd(scheme) {
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ^BC${scheme.orientation},${scheme.barHeight},N,N,N,N
            ^FD${scheme.data}
            ^FS
        `;
    }

    buildBoxCmd(scheme) {
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ^GB${scheme.boxWidth},${scheme.boxHeight},1,B,0
            ^FS
        `;
    }

    buildLineCmd(scheme) {
        let gb = `^GB${scheme.size},${scheme.size},1,B,0`;

        if (scheme.orientation === 'H') {
            gb = `^GB${scheme.size},0,1,B,0`;
        }
        if (scheme.orientation === 'V') {
            gb = `^GB0,${scheme.size},1,B,0`;
        }
        return `
            ^FO${scheme.xOrigin},${scheme.yOrigin}
            ${gb}
            ^FS
        `;
    }
}