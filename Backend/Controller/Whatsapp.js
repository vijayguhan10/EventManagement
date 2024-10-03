const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const whatsapp = new Client({
  authStrategy: new LocalAuth(),
});

const initializeWhatsApp = () => {
  whatsapp.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("QR Code received, scan it to log in.");
  });

  whatsapp.on("ready", () => {
    console.log("Client is ready!");
  });
  whatsapp.initialize();
};
