<template>

<form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim = "email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required)
            || ($v.email.$dirty && !$v.email.email) }"
            >
        <label for="email">Email</label>
        <small
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >
        Поле не должно быть пустым
        </small>
        <small
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.email"
        >
        Введите корректную почту
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required)
            || ($v.password.$dirty && !$v.password.minLength) }"
        >
        <label for="password">Пароль</label>
        <small
        class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
        >
        Не должен быть пустым
        </small>
        <small
        class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.minLength"
        >
        Не менее {{this.$v.password.$params.minLength.min}}
        симолов, сейчас {{password.length}}
        </small>
      </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          class="validate"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required) }"
      >
      <label for="name">Имя</label>
        <small
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
        >
        Не должен быть пустым
        </small>
    </div>
    <p>
      <label>
        <input type="checkbox"
        v-model="agree"
        />
        <span>С правилами согласен</span>
        <small
        class="helper-text invalid"
        v-if="$v.agree.$dirty && $v.agree.$error"
        >
        Вы согласны с условиями?
        </small>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {
  email, required, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
    };
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },

  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        // name: this.name,
      };

      console.log(formData);

      // this.$store.dispatch('reg', formData);
      this.$router.push('/');

      // try {
      //   await this.$store.dispatch('reg', formData);
      //   this.$router.push('/');
      // // eslint-disable-next-line no-empty
      // } catch (e) {
      //   console.log(e);
      // }

      // this.$router.push('/');
      // console.log(formData);
    },
  },

};

</script>
