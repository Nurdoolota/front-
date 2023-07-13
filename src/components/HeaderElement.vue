<template>
  <header>
    <nav>
      <h2><span>o</span>nly apps</h2>
      <ul>
        <li>
          <a v-if="isAuth" @click="$router.push({ name: 'courses' })"> Курсы</a>
        </li>
        <li>
          <a v-if="isAuth" @click="$router.push({ name: 'courses' })">
            О компании</a
          >
        </li>
      </ul>
      <div class="btn_head">
        <form-button
          classButton="btn__blue-white button__auth"
          @click="logOut"
          label="Выход"
        />
        <form-button
          classButton="btn__blue-white button__auth"
          @click="$router.push({ name: 'personal' })"
          label="Личный кабинет"
        />
      </div>
    </nav>
  </header>
</template>

<script>
import FormButton from "@/components/FormButton.vue";

export default {
  components: {
    FormButton,
  },
  name: "HeaderElement",
};
</script>
<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  background: #ffffff;
  height: 90px;
  /* left: 0px; */
  /* outline: 2px solid #c1c1c1; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

header nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
}

nav h2 span {
  color: blue;
}

/* .head_title {
  font-weight: 500;
  line-height: 44px;

  display: flex;
  align-items: center;
  text-align: center;
  color: #016670;
  cursor: pointer;
}
.head_title h1 {
  font-size: 36px;
} */

.btn_head {
  display: flex;
  /* cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000; */
}
</style>
