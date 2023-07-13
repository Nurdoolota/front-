<template>
  <div class="courses">
    <modal-window
      v-if="isModalVisible"
      :course="selectedCourse"
      @closeModalWindow="closeSelectCourse"
      title="Изменение курса"
    >
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form
            @submit.prevent="upload(selectedCourse.id)"
            class="form"
            method="post"
          >
            <ValidationProvider class="form__validator" v-slot="{ errors }">
              <input type="file" @change="fileChange($event)" id="file-input" />
              <span>{{ errors[0] }}</span>
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
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button
          label="Изменить"
          @click="validateAndCreateCourse(selectedCourse.id)"
          type="submit"
        />
      </template>
    </modal-window>
    <div class="courses__list">
      <course-element
        class="courses__item"
        v-for="course in courses"
        :key="course.id"
        :course="course"
        :imageUrl="getCourseImageUrl(course.id)"
      >
        <form-button
          class="courses__button"
          :course-id="course.id"
          @click="selectCourse(course)"
          label="Изменить" />
        <form-button
          class="courses__button"
          :course-id="course.id"
          @click="deleteCourse(course.id)"
          label="Удалить"
      /></course-element>
      <h1 v-if="!courses.length" class="error-message">Курсов нету</h1>
    </div>
  </div>
</template>

<script>
import CourseElement from "@/components/CourseElement";
import FormButton from "@/components/FormButton.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import FormInput from "@/components/FormInput.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import mixCourses from "@/mixins/mixCourses";
import mixModal from "@/mixins/mixModal";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      selectedCourse: null,
      dataSend: {
        name: "",
        description: "",
      },
    };
  },
  mixins: [mixCourses, mixModal],
  components: {
    FormButton,
    ModalWindow,
    FormInput,
    ValidationProvider,
    ValidationObserver,
    CourseElement,
  },

  mounted() {
    this.getCourses();
  },

  methods: {
    ...mapActions("mAuth", ["sendRequest"]),
    selectCourse(course) {
      this.selectedCourse = course;
      this.dataSend.name = this.selectedCourse.name;
      this.dataSend.description = this.selectedCourse.description;
      this.openModal();
    },
    closeSelectCourse() {
      this.selectedCourse = null;
      this.dataSend.name = "";
      this.dataSend.description = "";
      this.FILE = null;
      this.closeModal();
    },

    validateAndCreateCourse(id) {
      this.$refs.observer.validate().then((success) => {
        if (success) this.upload(this.dataSend, this.FILE, id);
      });
    },

    async deleteCourse(id) {
      try {
        const response = await this.sendRequest({
          request: "DELETE",
          url: `subjects/${id}`,
        });
        if (response.ok) await this.getCourses();
        else throw new Error("Ошибка при удалении курса.");
      } catch (error) {
        console.error(error);
      }
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
  max-width: 400px;
}

.courses__item:not(:last-child) {
  margin: 0px 0px 10px 0px;
}
</style>
