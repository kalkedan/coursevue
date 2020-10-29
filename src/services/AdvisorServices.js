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
    getAdvisors() {
        return apiClient.get("advisors");
    },

    addAdvisor(advisor) {
        return apiClient.post("advisors", advisor);
    },

    updateAdvisor(advisorid, advisor) {
        return apiClient.post("advisors/" + advisorid, advisor);
    },

    deleteAdvisor(advisorid) {
        return apiClient.delete("advisors/" + advisorid;)
    },
};