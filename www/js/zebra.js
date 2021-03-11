/*
    Nedded Plugin:
        - https://github.com/adriangrana/cordova-zebra-printer.git
*/
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

class Zebra {
    constructor() {
        this._connectedPrinters = [];
    }

    get connectedPrinters() {
        return this._connectedPrinters;
    }

    bytesToHex(bytes) {
        let hex = [];
        for (let i = 0; i < bytes.length; i++) {
            let current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];

            hex.push((current >>> 4).toString(16));
            hex.push((current & 0xF).toString(16));
        }
        return hex.join("");
    }

    base64PngToBytes(pngData) {
        let replaceStr = "data:image/png;base64,"
        let bytes = atob(pngData.replace(replaceStr, ""));
        let byteArray = new Uint8Array(bytes.length);

        for (let i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i);
        }
        return byteArray;
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
            });
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

    async base64PdfToPNG(base64PdfString, scale = 2.5) {
        GlobalWorkerOptions.workerSrc = await import('pdfjs-dist/build/pdf.worker.entry');

        return new Promise((resolve, reject) => {
            let binaryPDF = atob(base64PdfString);
            let loadingTask = getDocument({ data: binaryPDF });

            loadingTask.promise.then(pdf => {
                for (let index = 1; index <= pdf.numPages; index++) {
                    pdf.getPage(index).then(page => {
                        let viewport = page.getViewport({ scale: scale });
                        let canvas = document.createElement("CANVAS");
                        let context = canvas.getContext('2d');

                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        page.render({
                            canvasContext: context,
                            viewport: viewport
                        }).promise.then(() => {
                            let data = canvas.toDataURL('image/png');
                            let bytes = this.base64PngToBytes(data);
                            let result = this.bytesToHex(bytes);

                            resolve({ pngData: result, size: bytes.length });
                        }).catch(error => {
                            reject(error);
                        });
                    }).catch(error => {
                        reject(error);
                    });
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
}