export default function createScript() {
  let locationHost = window.location.host.toString();
  let prodUrl = locationHost.indexOf('myriadiot');
  let testUrl = locationHost.indexOf('96.8.239');
  let phaoUrl;
  if (prodUrl > 0) {
    phaoUrl = './static/js/paho-mqtt-min.js';
  } else if (testUrl > 0) {
    phaoUrl = './static/js/paho-mqtt-min.js';
  } else {
    phaoUrl = './pc/static/js/paho-mqtt-min.js';
  }
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = phaoUrl;
  document.body.appendChild(s);
}
