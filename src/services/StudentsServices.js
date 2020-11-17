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
  updateStudent(studentId, student) {
    return apiClient.put("students/" + studentId, student);
  },
  deleteStudent(studentId) {
    return apiClient.delete("students/" + studentId);
  },
  getStudentByEmail(email) {
    return apiClient.get("students/:email" + email);
  }

};