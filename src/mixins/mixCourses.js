export default {
  data() {
    return {
      courseName: "",
      description: "",
      courses: [
        { name: "afsd", description: "af;asdjkfla;dsfjklfkdslfalsdfj sadfjds" },
        { name: "afsd", description: "lorem23 sadfl jaslkfj lkasjdfkdsjfalfd" },
        { name: "afsd", description: "af djaflaj kjdkf jkfjkasjdfkajfklasdds" },
      ],
      FILE: null,
    };
  },
  methods: {
    async getCourses() {
      try {
        const response = await this.sendGetRequest("subjects");
        if (!response.ok) throw new Error("Ошибка при получении курсов");
        this.courses = await response.json();
        console.log(this.courses);
      } catch (error) {
        console.log(error);
      }
    },
    getCourseImageUrl(courseName) {
      return `${process.env.VUE_APP_BACKEND_URL}photo/${courseName}`;
    },
    fileChange(event) {
      let data = new FormData();
      data.append("file", event.target.files[0]);
      console.log(data);
      this.FILE = data;
    },
    async upload(dataSend, FILE, id = null) {
      try {
        if (id === null) {
          const courseData = await this.sendPostRequest("subjects", dataSend);
          const courseId = await courseData.json();
          id = courseId.id;
        } else await this.sendPatchRequest(`subjects/${id}`, dataSend);

        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}photo/upload/${id}`,
          {
            method: "POST",
            credentials: "include",
            body: FILE,
          }
        );

        if (response.ok) {
          window.location.reload();
          this.closeModal();
          console.log(response);
        } else {
          throw new Error("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
  },
};
