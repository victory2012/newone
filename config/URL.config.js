const env = process.env.pack_ENV === "test";
let URL;
if (!env) {
  URL = '"http://www.myriadiot.net/api"';
} else {
  URL = '"http://47.96.8.239/api"';
}
module.exports = URL;
