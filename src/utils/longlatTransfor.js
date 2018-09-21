/* eslint-disable */
import AMap from "AMap";

export default function (lnglat, cb) {
  let geocoder;
  geocoder = new AMap.Geocoder({
    radius: 1000 // 范围，默认：500
  });
  geocoder.getAddress(lnglat, (status, result) => {
    // console.log(result);
    if (status === 'complete' && result.regeocode) {
      cb(result.regeocode);
    }
  });
  // return new Promise(function (resolve) {
  //   geocoder.getAddress(lnglat, (status, result) => {
  //     if (status === 'complete' && result.regeocode) {
  //       address = result.regeocode.formattedAddress;
  //     } else {
  //       address = "";
  //     }
  //     resolve(address);
  //   });
  // })
}
