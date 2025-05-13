import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const refresh_token = async () => {
  const refresh_token_result = await axios.post(
    "https://ott.tvanywhereafrica.com:28182/api/client/v1/global/refresh",
    {
      refresh_token: cookies.get("user_info").data.data.refresh_token
    }
  );
  cookies.set("user_info", refresh_token_result, { path: "/" });
  window.location.reload();
};