export function PromiseWorker(worker) {
  var self = this;
  self._worker = worker;
  self._callbacks = {};
  worker.addEventListener("message", function (e) {
    onMessage(self, e);
  });
}
var messageIds = 0;

function onMessage(self, e) {
  var message = e.data;
  if (!Array.isArray(message) || message.length < 2) {
    return;
  }
  var messageId = message[0];
  var error = message[1];
  var result = message[2];
  var callback = self._callbacks[messageId];
  if (!callback) {
    return;
  }
  delete self._callbacks[messageId];
  callback(error, result);
}
PromiseWorker.prototype.postMessage = function (userMessage) {
  var self = this;
  var messageId = messageIds++;
  var messageToSend = [messageId, userMessage];
  return new Promise(function (resolve, reject) {
    self._callbacks[messageId] = function (error, result) {
      if (error) {
        return reject(new Error(error.message));
      }
      resolve(result);
    };
    if (typeof self._worker.controller !== "undefined") {
      var channel = new MessageChannel();
      channel.port1.onmessage = function (e) {
        onMessage(self, e);
      };
      self._worker.controller.postMessage(messageToSend, [channel.port2]);
    } else {
      self._worker.postMessage(messageToSend);
    }
  });
};

function htmlTemplate(engine) {
  return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Test</title>
                <style> body { background: rgb(238, 238, 238); }</style>
            </head>
            <body >
                <script src="${engine}"></script>
            </body>
            </html>
            `;
}
const iframeStyles = [
  "position: absolute",
  "left: 0",
  "width: 100%",
  "height: 100%",
  "border: 0",
].join(";");
const LWC_ENGINE_URL = "/resources/engine_v111.js";

export function createIframe(container, { code } = {}) {
  const html = htmlTemplate(LWC_ENGINE_URL);
  const iframe = document.createElement("iframe");
  iframe.title = "preview";
  iframe.setAttribute("style", iframeStyles);
  iframe.addEventListener("load", () => {
    const  innerDoc  = iframe.contentDocument;
    if (innerDoc) {
      const script = innerDoc.createElement("script");
      script.text = code;
      innerDoc.body.appendChild(script);
    }
  });
  container.appendChild(iframe);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();
  iframe.contentWindow.addEventListener("dragover", (evt) => {
    evt.preventDefault();
    return false;
  });
  iframe.contentWindow.addEventListener("drop", (evt) => {
    evt.preventDefault();
    return false;
  });
  return iframe;
}

export function removeIframe(container) {
  const iframe = container.firstChild;
  if (iframe) {
    container.removeChild(iframe);
  }
}
