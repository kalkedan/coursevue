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
  getSemesters() {
    return apiClient.get("semesters");
  },

  addSemester(semester) {
    return apiClient.post("semesters", semester);
  },
  updateSemester(semesterid, semester) {
    return apiClient.put("semesters/" + semesterid, semester);
  },
  deleteSemester(semesterid) {
    return apiClient.delete("semesters/" + semesterid);
  },

};