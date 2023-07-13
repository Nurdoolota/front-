<template>
  <div class="form-wrapper">
    <div class="form-conteiner">
      <div class="form-input">
        <h3>Ещё нет аккаунта?</h3>
        <p>Пожалуйста, введите свои данные ниже для регистрации на сайте</p>
        <form-button
          @click="$router.push({ name: 'registration' })"
          label="Регистрация"
          classButton="btn__white"
        />
      </div>
      <div class="form-input__active">
        <div class="form-input__title">
          <h3>Добро пожаловать!</h3>
          <p>Введите свои данные для входа в аккаунт</p>
        </div>
        <ValidationObserver ref="observer">
          <form class="form" @submit.prevent method="post">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                type="email"
                v-model.trim="dataAuth.email"
                label="Email"
                placeholderInput="Email"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataAuth.password"
                type="password"
                placeholderInput="Пароль"
                label="Пароль"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <form-button
              classButton="btn__blue-white button__auth"
              @click="validate"
              label="Войти"
            />

            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import { mapActions } from "vuex";

export default {
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  data() {
    return {
      dataAuth: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    ...mapActions("mAuth", ["login"]),
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) {
        await this.login(this.dataAuth);
      }
    },
  },
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .form__validator {
  text-align: center;
} */
template {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.form-conteiner {
  display: flex;
  /* flex-wrap: wrap; */
  height: 660px;
  margin: 50px;
  border-radius: 100px;
  background-color: #ff80;
  opacity: 0.5px;
  box-shadow: 1px 1px 100px 0px #00000014;
}

.form-wrapper {
}

.form-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 95px;
  border-radius: 100px;
  background-color: #4640de;
  color: white;
}

.form-input h3 {
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin-bottom: 5px;
}

.form-input p {
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 20px;
}

.form-input__active .button__click {
}

.form-input__active {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
}

.form-input__active {
}

.form-input__title {
  text-align: center;
  margin-bottom: 40px;
}

.form-input__title h3 {
  font-family: Gadugi;
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
}

.form-input__title p {
  /* margin: 10px 0 30px 0; */
  font-family: Gadugi;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #202430;
  opacity: 70%;
}

.button__auth {
  margin-top: 20px;
}
</style>
