class App {
    constructor() {
        this._zebra = new Zebra();
        document.addEventListener('deviceready', this.onDeviceReady1.bind(this), false);
    }

    get zebra() {
        return this._zebra;
    }
    onDeviceReady() {
        document.getElementById('deviceready').classList.add('ready');

        this._zebra.isBluetoothConnected().then(res => {
            alert(res);
        }).catch(() => {
            this._zebra.getBluetoothList().then(res => {
                alert(JSON.stringify(res));
                this._zebra.bluetoothConnect(res[0].address).then(res => {
                    let base64PDF = this.getBase64PdfString();
                    let binaryPDF = atob(base64PDF);
                    let bytePDFArray = new Uint8Array(binaryPDF.length);


                    for (let i = 0; i < binaryPDF.length; i++) {
                        bytePDFArray[i] = binaryPDF.charCodeAt(i);
                    }
                    this._zebra.writeBytes(bytePDFArray).then(res => {
                        alert(JSON.stringify(res));
                    }).catch(error => {
                        alert(JSON.stringify(error));
                    });
                }).catch(error => {
                    alert(JSON.stringify(error));
                });
            }).catch(error => {
                alert(JSON.stringify(error));
            });
        });
    }

    getBase64PdfString() {
        return "JVBERi0xLjYNJeLjz9MNCjIwMyAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTU3Ni9MZW5ndGggMjMwMC9OIDE4OS9UeXBlL09ialN0bT4+c3RyZWFtDQpo3oxZ0W5kJxL9FR5nXmKKoihYRZGSjGa1muyuZc/b1T5YTsuyNLGdVs9q8/d7qqDbihO4kUbm9i2oA4dzuMCUEIOGin+BkgZqHJIIyhxS5dACUw4UA+cWiALjPaWQEwfikAWtcpBIgSpKtlKCFLyuJRRrKqFk5MOvGgNp0IRfNaiDBG0xpBgqIzsea7GSQosFZQpN0CVtoVW8t/YxIVABExUdREmomRLKTME6Zf2giheJDAdvUsYfDJA44nVF19jQLCM3NEb9nGpg1MgN40UFAROM5oLxMQAFg2FkKeg/o76NyMZaFO+RVCM6g3yKRmyjLGDRe24sWn9S8GEL3tsAqjFpIwWV0ciOwfof0WeMOEV0F9CJMCJpKAveC0r0V2y86LQgZSr4jZQ2MgEU5xwwT4kV9UFsxowJ8mZUysibQU5GXjFcsYnGb+STalOKriFvti4W9Af5FHnxmBSDx1BTjRIUeSo6q8hTwa/NQ8NEAzI1JFHgNeBoAhWYWmWUBXlAZYS6ikkKZCk0RahcjELDAbUYCNSCEo0xZOaI36CKkRcpmAEKavETeZEnY3AN9QQ8gRoWkNWQp0CQgOKCycEUsI0H6mIbD9TFikmGupAumvS5gicIgytIqiYB/IGOuZk0i4m+QqIoTaKgKELAaJoj8mIqcwS4UUiWt6I0GYOTnJCQMKkQGKYfJshsejD60Uk8YF7YlBgbCDcpkTGvFkJeQdwEnsUsFNUMZ28AUUxH0abPPIh5ycU0jgFmNQlGm3GjA4mrCR9UYvotgsTVHAIx52YIbKoBH8QmGxM2RC/mMGITkJkRfROyXkAK4i7CQCSBIJtMSWJ2ilCjYUHrwmaUZPpU9qVFQEtwRedszSHhrPYACDErwyQiYp5GZrGFBguEFDMeYMTMRnCpaDSLIrPaiMWsktykeDDixUxjSxLULWYt+BgPxhxMUcxkBJgSxZYnU3gz7yukZiZG5wrZCgYnlYRpIFih+CqC8Zdk1ME00BbywAiFbZEyhdpyQqhXspkbWihZjUzkAYkIAV3EumFvTBEYUilQPMFVRTFnZApXpMdaggfjB9NQKtlqAvQKO2C5wUOzykBvvgABvRk/cJFGiMkGgFUJzYtZzSYXhlKbGYLj1CghWEmpWWWzq40dmtSkvtLBuGSt4GgG2d9+e/UJH4oYbq6u746Hp9Pn4+GAlUvevPrX4X+nT4ffAl3dPH85/PPuBatZ9Dqff3s5XN2ejl/vveLN8/Ppu+88bfX4T3dPD+8OT++vrkPxF7dXH57vv/6CxL3e1uy1fX68kF54Y/sUeJG94FFTR1lHk5pHqb1scZRs5X+ArAP5+u7hcPX5nRWB3o9+2kfRRzt6jA4+/nfEIt6OPFfXD0HOeUbXaSDRGehthu+/nN59BncfHw9ffqb3yJhQq03ygd55cCPuYHkF9vHpm5+e7/9mSNn6nmZQvIpu9r3vnJYV2vWXp2P4+/HF8YplrHkGKMvwRmVM7grv3y/f3J5Ap+NVSygzOF1FN+oSSnGF9unxFH54fApnQsnVUGeIbRXdbP/TVZn2MD8cn19eQZNLME4lQ8v4ZvurPpO0h3tzuH/sU0muHZ3rlJfxLXVnJl5B3hx+/dBnkkw63et/iibrcOWJfw3lx+efD/ioff/D3fHeHh3PxVH/oP6Pjw9fj4cLcXUQ13aIOz0+PYTb090RU3d3OvQhdTXovNPL+Ja6/1Jf0lKXK3cJcV8IuFfhPzjm9nB/XoN56HEsob9b25LJmac95LJoaqLjqfc4L5qanpmnTdOiqamOpzrguGhqgk5TPacVTa6+KU1pRZPrekpTjm90+zpxW+5TXbp5xxevDUXS+NDxKOWi0P6JfJOqmzF3ueTeJveM0mPSY3KR0uja7/JIR38F631844d/nA6/9A+dKVzmvOkyLGdapyDJQcxmMl3mpTtF8m6X2bKxyVrmn8y4Cm/S50poFyw7mKk5t7kRluFc9/gRBzHd5ynLeZfl4lnMAnnKcu4s532W1bPZzOc5y2UV3sowRt/zlb5rKF2a2mPaY1pWatbuA63nSiWu1MwmNC3TTtdlWAd3cxBXczaB6XSLpN2syrtddjVnU5BOl8tMq/BW+gKhcRfM1ZxNaGW6N8q8DBfd48fVnE2HZcpy2WXZ1ZxNYGXKcuksl32WXc3ZZr7MWdZVeBubs76DCWPTPc4x4xjTTx+hH8lmam7dB+2ygGtbqVlMaG3+YWrL8OW8NAVxNYufZqZnp7Efft0OT7O5msUUNN8GS1qFt7GXe93KTcFczWJCm2/eJC/Dtezx42oW02Gdslx3WXY1iwmsTlnuu/5Q91l2NYvNfJ2zXFfhrY2DeRwH8zgO5nGc7eKIn8/6r0fZP9M0ne8C6LKQt7pSdfGjEE1PoCWu40Tng8QUx4Vd/Ei2ODxfrgVot+Ou7eLHrTj92Bdexje7Q+wE111A13fxs3pcrKTruN1M7jDlEi9+0IpzxuMu4y7y4qelOGc8DsbjPuOuc/UFcE54W4U3GtdTNO6nKI2rmXFqozTi48BGvBb6OMkRX4Q+tvgzpasrkKe8Ki3jG/FwIPM+omteXaLzw5fyMr7ROMISx31EN4W6RlOd76mW8Y3SWHWS7iO6K9RVNj+vqa7jlM5L9hzIbaF+OZB4nijtJnJfVF/R0px1Ol+u/gXW3Ri1r21T1ist4xvxkP44wFIe34B8PqsOp46jGclyl05ybnZZ2capd2aN6kKV6dJVeRnfSEaHRfYR3RrVhSrT2ayyjG8kgypJ+4hujdqvPqef6arL+Eb5PEltH9Gt0Vxo84Nkbcv4RuP2gXLZR3SPNBdini5xjZbxjca1B2XeR3QzNVdOni5xjZfxjc7/P5HjPqKbrblyeH6jLMv4RuN6iMowUxksl+EaHXEd8fWRmPTc7NVssjxHNBfi/NzbdBnfaBzVSWUfMfU7eFeiTt3W2jK+0bgkIE37kNwhXYo6v4KPtKyw0bifoNL2MXPHdDEWXeycdiqcz8kLKOlQrrIy/6yVvJup9Eyu5zLnflzeUPkL3GtP6QorC+51WuH/AgwAz3LFugplbmRzdHJlYW0KZW5kb2JqCjIwNCAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTMvTGVuZ3RoIDI2Ny9OIDIvVHlwZS9PYmpTdG0+PnN0cmVhbQ0KaN40kkFuQyEQQ6/CDYqBGfhSlCN00W2UI3QV5f5V4zcrf/GfGbDRFa03XdlGb7fb1/f79/XwQm8/z/v9oWv9fzbJ0i0sTstJNKzb4tWB5UIGyoan1NjwlgPq1ATc53x0Ip4wfZppz2QjI8NI2B9eDBbtC88IHyRsXyaXyWVymdz+t33N7Utv/vkQ27ukx6bJNJkm0+Tlf068kTYhkRGX5+6EfUwek5UimUs0UQ1VfdVfPyhVdfgO36tueJLWhJtwZC5C16Cnwb7Er8GDqV7rUdSroBgFvmAOFSnwUZIWPmoSPWnhoyktfKvugY8KRYfa9XKZR43azKNIJb5kXsJTpvLDP/8EGABE+aBVCmVuZHN0cmVhbQplbmRvYmoKMjA1IDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9GaXJzdCA5L0xlbmd0aCAxNjQvTiAyL1R5cGUvT2JqU3RtPj5zdHJlYW0NCmjeRI5BCoNADEWvkhOYjFOpBZlFW9yUgqg7kSI2FDdOmYlgb99oF10k4ee/fGKBIAObQVHgxS+zgMHb9IxdpkbdY/t5M1bDi6NzOzILzxIhJbMBeOfnNJz92lFCsFWa59oPNk2o18OgNNgdrTn6JYwcNafUHB2teRCY03H3VRgV+Sacwyr4sWHpsLqW2PIqvS4bCcsov9gI9H/Pua8AAwBO5jpWCmVuZHN0cmVhbQplbmRvYmoKMjA2IDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9GaXJzdCAxMy9MZW5ndGggOTEvTiAyL1R5cGUvT2JqU3RtPj5zdHJlYW0NCmjeMrQ0VzBQMLS0UDA3V7Cx0XdKLE51y88r0fdIzSlLLclMTtR1ys9J0XfNS85PycxL1w/PzHPMK86E84NLk0oqC1L1Q4CEIZjUB+m3s8NqGBnmAAQYACezODQKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L0Fjcm9Gb3JtIDE5OSAwIFIvTWFya0luZm88PC9NYXJrZWQgdHJ1ZT4+L01ldGFkYXRhIDIgMCBSL1BhZ2VzIDMgMCBSL1N0cnVjdFRyZWVSb290IDYgMCBSL1R5cGUvQ2F0YWxvZz4+CmVuZG9iagoyIDAgb2JqCjw8L0xlbmd0aCAzNDI4L1N1YnR5cGUvWE1ML1R5cGUvTWV0YWRhdGE+PnN0cmVhbQ0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwMTUgODEuMTYxNTgwLCAyMDE3LzEyLzAxLTAxOjM4OjIxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6ZGVzYz0iaHR0cDovL25zLmFkb2JlLmNvbS94ZmEvcHJvbW90ZWQtZGVzYy8iPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDIxLTAzLTA5VDE3OjQxOjE4WjwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBMaXZlQ3ljbGUgRGVzaWduZXIgMTEuMDwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyMS0wMy0wOVQxNzo0MToxOFo8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAyMS0wMy0wOVQxNzo0MToxOFo8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8cGRmOlByb2R1Y2VyPkFkb2JlIFhNTCBGb3JtIE1vZHVsZSBMaWJyYXJ5PC9wZGY6UHJvZHVjZXI+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnV1aWQ6OTQ2NGUwYTEtZDhkZS00ZjMxLWEwNjktMjEwYmE0ZTRiMDY0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD51dWlkOjdiNjJjYTc5LTFkZDItMTFiMi0wYTAwLWY3MDgwMDAwMDAwMDwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPGRjOmZvcm1hdD5hcHBsaWNhdGlvbi9wZGY8L2RjOmZvcm1hdD4KICAgICAgICAgPGRlc2M6dmVyc2lvbiByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxyZGY6dmFsdWU+OS4wLjEuMC4yMDA5MTIwNi4xLjYxNTI2My41ODM2MTU8L3JkZjp2YWx1ZT4KICAgICAgICAgICAgPGRlc2M6cmVmPi90ZW1wbGF0ZS9zdWJmb3JtWzFdPC9kZXNjOnJlZj4KICAgICAgICAgPC9kZXNjOnZlcnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4KZW5kc3RyZWFtCmVuZG9iagoxOTkgMCBvYmoKPDwvRFI8PC9Gb250PDwvSGVCbyAxOTcgMCBSL0hlbHYgMTk4IDAgUj4+Pj4+PgplbmRvYmoKMjAwIDAgb2JqCjw8L0RyYXcvRGl2L0ZpZWxkL0Rpdi9QYWdlL1BhcnQvU3ViZm9ybS9TZWN0Pj4KZW5kb2JqCjIwMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIxMTI+PnN0cmVhbQ0KSImkV11vG0UUffevGMELPHgyd74HISR/hNQiaYNtKt6Q5WyLqWMH1yrl33PH602y3t2ZvYJKQNPp7Dnn3nPunfFycDXZ747F7sh+/PHqbjKbMsF++mk8nbCBYPHX4ePgal5sV8fNl2Ky3+4Pm8fieNis2WEzuFrCH4IBW37Aw54NHQ/4D/4lCdw6zZTjGhxbPg6++2VzPG52H9n3y7/w7BA4KM+WD4PvxqvD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";
    }

    onDeviceReady1() {
        document.getElementById('deviceready').classList.add('ready');

        // zebra.scan(printers => {
        //     alert("printers---->" + JSON.stringify(printers));

        //     let base64PDF = this.getBase64PdfString();
        //     let binaryPDF = atob(base64PDF);
        //     let bytePDFArray = new Uint8Array(binaryPDF.length);


        //     for (let i = 0; i < binaryPDF.length; i++) {
        //         bytePDFArray[i] = binaryPDF.charCodeAt(i);
        //     }

        //     this._zebra.bluetoothConnect(printers[0].serialNumber).then(res => {
        //         alert(JSON.stringify(res));

        //         let base64PDF = this.getBase64PdfString();
        //         let binaryPDF = atob(base64PDF);
        //         let bytePDFArray = new Uint8Array(binaryPDF.length);


        //         for (let i = 0; i < binaryPDF.length; i++) {
        //             bytePDFArray[i] = binaryPDF.charCodeAt(i);
        //         }
        //         this._zebra.writeBytes(bytePDFArray).then(res => {
        //             alert(JSON.stringify(res));
        //         }).catch(error => {
        //             alert(JSON.stringify(error));
        //         });
        //     }).catch(error => {
        //         alert(JSON.stringify(error));
        //     });

        //     // zebra.write(printers[0].serialNumber, binaryPDF, result => {
        //     //     alert("printers-write---->" + JSON.stringify(result));

        //     // }, error => {
        //     //     alert("printers-error---->" + JSON.stringify(error));
        //     // });
        // }, error => {
        //     this._connectedPrinters = [];
        //     reject(error);
        // });

        ble.startScan([], device => {
            alert("DONE---->" + JSON.stringify(device));
        }, error => {
            alert("ERROR---->" + JSON.stringify(error));
        });

        bluetoothle.initialize(device => {
            alert("bluetoothle-initialize---->" + JSON.stringify(device));

            bluetoothle.startScan(device => {
                alert("startScan-OK---->" + JSON.stringify(device));



                let base64PDF = this.getBase64PdfString();
                let binaryPDF = atob(base64PDF);
                let bytePDFArray = new Uint8Array(binaryPDF.length);


                for (let i = 0; i < binaryPDF.length; i++) {
                    bytePDFArray[i] = binaryPDF.charCodeAt(i);
                }

                this._zebra.bluetoothConnect('AC3FA4F374F5').then(res => {
                    alert(JSON.stringify(res));

                    let base64PDF = this.getBase64PdfString();
                    let binaryPDF = atob(base64PDF);
                    let bytePDFArray = new Uint8Array(binaryPDF.length);


                    for (let i = 0; i < binaryPDF.length; i++) {
                        bytePDFArray[i] = binaryPDF.charCodeAt(i);
                    }
                    this._zebra.writeBytes(bytePDFArray).then(res => {
                        alert(JSON.stringify(res));
                    }).catch(error => {
                        alert(JSON.stringify(error));
                    });
                }).catch(error => {
                    alert(JSON.stringify(error));
                });





            }, error => {
                alert("startScan-ERROR---->" + JSON.stringify(error));
            });
        });

        // ble.scan([], 5, device => {
        //     alert("ble-OK---->" + JSON.stringify(device));
        // }, error => {
        //     alert("ble-ERROR---->" + JSON.stringify(error));
        // });
    }
}

// ------------------------------------------------
//                      Main
// ------------------------------------------------

const app = new App();






