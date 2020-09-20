import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:3001/courseapi/";
} else {
  baseurl = "http://localhost:3001/courseapi/";
}

const apiClient = axios.create({
  baseURL: baseurl
});

export default {
  getCourses() {
    return apiClient.get("courses");
  }
};
