import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:3001/api/";
} else {
  baseurl = "/api/";
}

const apiClient = axios.create({
  baseURL: baseurl
});

export default {
  getDegrees() {
    return apiClient.get("degrees");
  },

  addDegree(degree) {
    return apiClient.post("degrees", degree);
  },
  updateDegree(degreeid, degree) {
    return apiClient.put("degrees/" + degreeid, degree);
  },
  deleteDegree(degreeid) {
    return apiClient.delete("courses/" + degreeid);
  },

};