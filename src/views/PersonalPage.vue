<template>
  <div class="courses">
    <modal-window
      v-if="isModalVisible"
      @closeModalWindow="clearData"
      title="Создание курса"
    >
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent="upload" class="form" method="post">
            <ValidationProvider class="form__validator" v-slot="{ errors }">
              <input
                type="file"
                rules="file"
                @change="fileChange($event)"
                id="file-input"
              />
              <span>{{ errors[0] }}</span>
              <img :src="previewImage" alt="" />
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataSend.name" label="Название" />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.description"
                label="Описание"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <p v-if="error" class="form__error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button
          label="Создать"
          @click="validateAndCreateCourse"
          type="submit"
        />
      </template>
    </modal-window>
    <form-button
      class="courses__button"
      @click="$router.push({ name: 'courses' })"
      label="Курсы"
    />
    <form-button
      v-if="role !== `USER`"
      class="courses__button"
      @click="openModal"
      label="Создать курс"
    />

    <form-button @click="$router.push({ name: 'admin' })" label="Админка" />
  </div>
</template>

<script>
import FormButton from "@/components/FormButton.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import FormInput from "@/components/FormInput.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import mixCourses from "@/mixins/mixCourses";
import mixModal from "@/mixins/mixModal";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    FormButton,
    ModalWindow,
    FormInput,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [mixCourses, mixModal],
  data() {
    return {
      dataSend: {
        name: "",
        description: "",
      },
      FILE: null,
      previewImage: null,
    };
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
    role() {
      return this.getUser.role;
    },
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    clearData() {
      this.name = "";
      this.description = "";
      this.FILE = null;
      this.closeModal();
    },
    validateAndCreateCourse() {
      this.$refs.observer.validate().then((success) => {
        if (success && this.FILE) this.upload(this.dataSend, this.FILE);
      });
    },
    async upload(dataSend, FILE, id = null) {
      try {
        if (id === null) {
          const courseData = await this.sendRequest({
            request: "POST",
            url: "subjects",
            data: dataSend,
          });
          const courseId = await courseData.json();
          id = courseId.id;
        } else await this.sendRequest("PATCH", `subjects/${id}`, dataSend);

        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}photo/upload/${id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {},
            body: FILE,
          }
        );

        if (response.ok) {
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
    fileChange(event) {
      let data = new FormData();
      let file = event.target.files[0];
      data.append("file", file);
      this.FILE = data;
      let fileReader = new FileReader();
      fileReader.onload = function () {
        this.previewImage = fileReader.result;
      };

      fileReader.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>

<style scoped>
.courses {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.courses__title {
  margin: 0px 0px 10px 0px;
}
.courses__button {
  margin: 0px 0px 10px 0px;
}
.courses__list {
}
.courses__item {
}

.courses__item:not(:last-child) {
  margin: 0px 0px 10px 0px;
}
</style>
