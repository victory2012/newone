// mqtt相关配置， 详情文档 在下方链接
// http://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
const env = window.location.host === "www.myriadiot.net";
const mqtt = {
  // hostname: '47.96.8.239',
  hostname: env ? "47.99.120.144" : '47.96.8.239',
  port: 8083,
  clientId: `pc${new Date().getTime()}`,
  timeout: 30,
  keepAliveInterval: 100,
  cleanSession: false,
  useSSL: false,
  reconnect: true // 断开后 是否重连
};
console.log(mqtt);
export default mqtt;
