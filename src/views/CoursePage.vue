<template>
  <div>
    <modal-window
      v-if="isModalVisible"
      :course="selectedCourse"
      @closeModalWindow="closeSelectCourse"
      title="Изменение курса"
    >
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent class="form" method="post">
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
          @click="validateAndCreateCourse"
          type="submit"
        />
      </template>
    </modal-window>
    <img
      :src="imageUrl"
      alt="Здесь должна быть картинка"
      class="course__image"
    />
    Название: {{ course.name }} Описание: {{ course.description }}
    <form-button
      class="courses__button"
      :course-id="course.id"
      @click="selectCourse(course)"
      label="Изменить"
    />
  </div>
</template>

<script>
import mixCourses from "@/mixins/mixCourses";
import mixModal from "@/mixins/mixModal";
import FormButton from "@/components/FormButton";
import { mapActions } from "vuex";
export default {
  components: {
    FormButton,
  },
  mixins: [mixCourses, mixModal],
  data() {
    return {
      course: null,
      imageUrl: "",
    };
  },
  mounted() {
    this.course = this.getCourse();
    this.getCourseImageUrl(this.$attrs.id);
  },
  methods: {
    ...mapActions("mAuth", ["sendRequest"]),
    getCourseImageUrl(id) {
      this.imageUrl = `${process.env.VUE_APP_BACKEND_URL}photo/${id}`;
    },
    async getCourse() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `subjects/${this.$attrs.id}}`,
        });
        if (!response.ok) throw new Error("Ошибка при получении курса");
        this.course = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
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
  },
};
</script>

<style scoped></style>
