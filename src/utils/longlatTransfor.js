/* eslint-disable */
import AMap from "AMap";

let geocoder;
let address;
export default function (lnglat) {
  console.log(lnglat);
  console.log(AMap);
  geocoder = new AMap.Geocoder({
    radius: 1000 // 范围，默认：500
  });

  geocoder.getAddress(lnglat, (status, result) => {
    if (status === 'complete' && result.regeocode) {
      console.log(result);
      address = result.regeocode.formattedAddress;
    } else {
      address = "";
    }
    // console.log(address);
    return address;
  });
  return address;
}
