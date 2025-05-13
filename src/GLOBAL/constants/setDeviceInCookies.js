// UUID
import { v4 as uuidv4 } from "uuid";
import Cookies from "universal-cookie";
import UAParser from "ua-parser-js"; //checks browser cookies details and stuff

let parser = new UAParser();
const cookies = new Cookies();

export const setDeviceInCookies = () => {
  // device infomations here
  // if device is not set in browser set uuidv4 for it so it differentiates
  if (!cookies.get("device")) {
    cookies.set("device", uuidv4());
  }
  // console.log(parser.getResult());
  cookies.set("device_info", parser.getResult(), { path: "/" });
};
