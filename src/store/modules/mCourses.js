const mCourses = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getCourses() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: "subjects",
        });
        if (!response.ok) throw new Error("Ошибка при получении курсов");
        this.courses = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
};

export default mCourses;
