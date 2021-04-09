<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCateg">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="minValue"
              :class="{invalid: ($v.minValue.$dirty && !$v.minValue.minValue) ||
              ($v.minValue.$dirty && !$v.minValue.required)}"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
              v-if="($v.minValue.$dirty && !$v.minValue.minValue) ||
              ($v.minValue.$dirty && !$v.minValue.required)"
          >Минимальная величина {{ $v.minValue.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
// import messages from '@/plugins/message';

export default {
  data() {
    return {
      name: '',
      minValue: 100,
    };
  },

  validations: {
    name: { required },
    minValue: { required, minValue: minValue(100) },
  },

  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },

  methods: {
    async createCateg() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        try {
          const category = await this.$store.dispatch('createCategory', {
            name: this.name,
            minValue: this.minValue,
          });

          // console.log(category);
          if (!category) {
            this.$message(`Категория ${this.name} уже существует`);
          } else {
            this.$message(`Категория ${this.name} созданна`);
            this.name = '';
            this.minValue = 100;
            this.$v.$reset();
            this.$emit('created', category);
          }
        } catch (e) {
          console.log(`${e} 11111`);
        }
      }
    },
  },
};
</script>
