class App {
    constructor() {
        this.zebra = new Zebra();
    }

    init() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

    onDeviceReady() {
        document.getElementById('deviceready').classList.add('ready');
    }

}





