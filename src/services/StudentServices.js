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
  getStudents() {
    return apiClient.get("students");
  },

  addStudent(student) {
    return apiClient.post("students", student);
  },
  updateStudent(studentid, student) {
    return apiClient.put("students/" + studentid, student);
  },
  deleteStudent(studentid) {
    return apiClient.delete("students/" + studentid);
  },

};