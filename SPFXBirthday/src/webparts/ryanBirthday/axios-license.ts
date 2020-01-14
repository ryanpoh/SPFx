import axios from "axios";

//! When setting up Firebase, there is some sort of 30 Day database disable feature. If got problem, it should be because of that.
const instance = axios.create({
  baseURL: "https://srkk-license-manager.firebaseio.com/"
});

export default instance;
