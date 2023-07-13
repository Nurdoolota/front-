<template>
  <div>
    <div @click="click" class="course-wrapper">
      <!-- <a href="#"> -->
      <div class="course-header">
        <div class="course-title">
          <h3 class="course__name">{{ course.name }}</h3>
          <div class="course__volume">
            <a href="#" class="course__lection display-block"
              ><span>2</span> лекций</a
            >
            <a href="#" class="course__test display-block"
              ><span>3</span> теста</a
            >
          </div>
        </div>
        <div class="course__icon">
          <img
            :src="imageUrl"
            alt="Здесь должна быть картинка"
            class="course__image"
          />
        </div>
      </div>
      <div class="course__descrabtion">{{ course.description }}</div>
      <form-button
        classButton="btn__blue-white"
        @click="$router.push({ name: 'personal' })"
        label="Подробнее"
      />
      <!-- </a> -->
    </div>
    <!--  -->
    <!-- <a href="" class="course">
      <img
        :src="imageUrl"
        alt="Здесь должна быть картинка"
        class="course__image"
      />
      <div class="course__name">Курс: {{ course.name }}</div>
      <div class="course__author">Описание: {{ course.description }}</div>
    </a> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
    imageUrl: String,
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
.course {
  display: flex;
  flex-direction: column;
  border: 2px solid #7a956b;
}
.course-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 15px;
  padding: 45px;
  box-shadow: 1px 1px 100px 0px #00000014;
  border-radius: 40px;
}
.course-header {
  display: flex;
  justify-content: space-between;
}
.course-title {
}
.course__name {
  font-size: 20px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
}
.course__volume {
  display: flex;
  align-content: flex-start;
  width: 100%;
  margin: 10px 0;
  /* padding: 5px; */
}
.course__volume a {
  line-height: 19px;
}

.display-block {
  display: block;
  /* padding: 10px, 15px, 10px, 15px; */
  margin-right: 10px;
  padding: 10px 15px;
  border-radius: 100px;
  font-size: 14px;
  line-height: 19px;
  background-color: #82dbda;
}
.course__lection {
}
.course__test {
}
.course__icon {
  width: 65px;
  height: 64px;
}
.course__descrabtion {
  margin: 10px;
}
</style>
