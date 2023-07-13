/* eslint-disable */
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async sendRequest(request, url, data = {}) {
      console.log(data);
      const requestOptions = {
        method: request,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      if (request === "POST" || request === "PATCH")
        requestOptions.body = JSON.stringify(data);

      return fetch(url, requestOptions);
    },
    async sendGetRequest(url) {
      return await this.sendRequest(
        "GET",
        `${process.env.VUE_APP_BACKEND_URL}${url}`
      );
    },
    async sendPostRequest(url, data = {}) {
      return await this.sendRequest(
        "POST",
        `${process.env.VUE_APP_BACKEND_URL}${url}`,
        data
      );
    },
    async sendPatchRequest(url, data = {}) {
      return await this.sendRequest(
        "PATCH",
        `${process.env.VUE_APP_BACKEND_URL}${url}`,
        data
      );
    },
    async sendDeleteRequest(url) {
      return await this.sendRequest(
        "DELETE",
        `${process.env.VUE_APP_BACKEND_URL}${url}`
      );
    },
    async aurhorize() {
      return await this.sendGetRequest("auth");
    },
    async logOut() {
      try {
        const response = await this.sendPostRequest("auth/log-out");
        if (!response.ok) throw new Error("Ошибка при выходе");
        this.$router.push("/authorization");
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async login(data) {
      try {
        const response = await this.sendPostRequest(`auth/log-in`, { email: this.email, password: this.password });
        if (response.ok) {
          this.$router.push({ name: "courses" });
        } else if (response.status === 401) {
          throw Error("Ошибка авторизации: неверный email или пароль");
        } else {
          throw Error("Неизвестная ошибка");
        }
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async register() {
      try {
        const response = await this.sendPostRequest(
          "auth/register",
          this.dataReg
        );
        console.log(await response.json());
        if (response.ok) {
          this.$router.push({ name: "authorization" });
        } else if (response.status === 400) {
          throw Error("Ошибка регистрации: Такой пользователь уже существует");
        } else {
          throw Error("Неизвестная ошибка");
        }
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
  },
};
