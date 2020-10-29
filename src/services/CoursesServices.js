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
  getCourses() {
    return apiClient.get("courses");
  },

  addCourse(course) {
    return apiClient.post("courses", course);
  },
  updateCourse(courseid, course) {
    return apiClient.put("courses/" + courseid, course);
  },
  deleteCourse(courseid) {
    return apiClient.delete("courses/" + courseid);
  },

};