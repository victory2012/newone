/* eslint-disable */
import AMap from "AMap";

export default function (lnglat, cb) {
  let geocoder;
  let address;
  geocoder = new AMap.Geocoder({
    radius: 1000 // 范围，默认：500
  });
  geocoder.getAddress(lnglat, (status, result) => {
    if (status === 'complete' && result.regeocode) {
      address = result.regeocode.formattedAddress;
    } else {
      address = "";
    }
    cb(address);
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
