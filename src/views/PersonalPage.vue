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
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="courseName"
                placeholderInput="Название"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="description"
                placeholderInput="Описание"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <p v-if="error" class="form__error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button
          classButton="btn__blue-white"
          placeholderInput=""
          label="Создать"
          @click="validateAndCreateCourse"
          type="submit"
        />
      </template>
    </modal-window>
    <div class=""></div>
    <form-button
      classButton="btn__blue-white"
      @click="$router.push({ name: 'courses' })"
      label="Курсы"
    />
    <form-button
      classButton="btn__blue-white"
      @click="openModal"
      label="Создать курс"
    />

    <form-button
      classButton="btn__blue-white"
      @click="$router.push({ name: 'admin' })"
      label="Админка"
    />
  </div>
</template>

<script>
import FormButton from "@/components/FormButton.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import FormInput from "@/components/FormInput.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import mixAuth from "@/mixins/mixAuth";
import mixCourses from "@/mixins/mixCourses";
import mixModal from "@/mixins/mixModal";

export default {
  components: {
    FormButton,
    ModalWindow,
    FormInput,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [mixAuth, mixCourses, mixModal],
  data() {
    return {};
  },
  methods: {
    clearData() {
      this.courseNamename = "";
      this.description = "";
      this.FILE = null;
      this.closeModal();
    },
    validateAndCreateCourse() {
      this.$refs.observer.validate().then((success) => {
        if (success && this.FILE) this.upload(this.dataSend, this.FILE);
      });
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
