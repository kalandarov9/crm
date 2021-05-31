<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submit(name)">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) }"
        >
        <label for="description">Имя</label>
        <span
            class="helper-text "
            :class="{invalid: ($v.name.$dirty && !$v.name.required) }"
            >name
        </span>
      </div>

      <div class="switch mb-2">
        <label>
          Eng
          <input type="checkbox"
          v-model="lang">
          <span class="lever"></span>
          Ru
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      name: 'name',
      lang: 'Ru',
    };
  },

  validations: {
    name: { required },
  },

  async mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    this.name = this.$store.getters.info.name;
    // eslint-disable-next-line no-undef
    setTimeout(() => { M.AutoInit(); }, 0);
  },

  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      }

      console.log(this.lang);
    },
  },
};

</script>

<style>
  .mb-2 {
    margin-bottom: 20px;
  }
</style>
