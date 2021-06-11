<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submit({name, lang})">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required) }"
        >
        <label for="description">{{ 'Name' | localize }}</label>
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

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Validations } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import M from 'materialize-css';
import { IInfo } from '@/store/info';

@Component({
  name: 'Profile',
})
export default class Record extends Mixins(validationMixin) {
  name: string = 'name'

  lang: boolean = true

  @Validations()
  validations = {
    name: { required },
  };

  mounted() {
    M.updateTextFields();
    this.name = this.$store.getters.gInfo.name;
    this.lang = this.$store.getters.gInfo.lang === 'ru-Ru';
    setTimeout(() => { M.AutoInit(); }, 0);
  }

  async submit(obj: IInfo) {
    if (this.$v.$invalid) {
      this.$v.$touch();
    }
    try {
      if (obj.lang) {
        // eslint-disable-next-line no-param-reassign
        obj.lang = 'ru-Ru';
      } else {
        // eslint-disable-next-line no-param-reassign
        obj.lang = 'en-En';
      }
      await this.$store.dispatch('updateInfo', obj);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style>
  .mb-2 {
    margin-bottom: 20px;
  }
</style>
