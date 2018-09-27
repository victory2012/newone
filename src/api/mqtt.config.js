// mqtt相关配置， 详情文档 在下方链接
// http://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
const mqtt = {
  hostname: '47.96.8.239',
  port: 8083,
  clientId: 'client-mao2080',
  timeout: 30,
  keepAliveInterval: 100,
  cleanSession: false,
  useSSL: false,
  reconnect: false // 断开后 是否重连
};
export default mqtt;
