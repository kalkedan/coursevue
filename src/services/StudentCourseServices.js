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
  getStudentCourses() {
    return apiClient.get("studentCourses");
  },

  addStudentCourse(studentCourse) {
    return apiClient.post("studentCourses", studentCourse);
  },
  updateStudentCourses(studentCourseid, studentCourse) {
    return apiClient.put("studentCourses/" + studentCourseid, studentCourse);
  },
  deleteStudentCourse(studentCourseid) {
    return apiClient.delete("studentCourses/" + studentCourseid);
  },

};