<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="editCategory">

        <div class="input-field">
          <select v-model="currency">
            <option disabled value="">Выберите один из вариантов</option>
            <option
            v-for="category in categories"
            :value ="category.name"
            :key="category.id" >
            {{ category.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
          :disabled="disabled"
          type="text"
          id="name"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          />
          <label
            for="name"
            :class="{active: form}"
          >Название</label>
          <span class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
          id="limit"
          type="number"
          :disabled="disabled"
          :class="{invalid: ($v.minValue.$dirty && !$v.minValue.minValue) ||
              ($v.minValue.$dirty && !$v.minValue.required)}"
          v-model.number="minValue"
          />
          <label
            for="limit"
            :class="{active: form}"
          >Лимит</label>
          <span class="helper-text invalid"
           v-if="($v.minValue.$dirty && !$v.minValue.minValue) ||
              ($v.minValue.$dirty && !$v.minValue.required)"
          >Минимальная величина {{ $v.minValue.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>

  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  props: ['categories'],
  data() {
    return {
      name: '',
      minValue: '',
      id: '',
      form: false,
      currency: null,
      disabled: true,
    };
  },

  validations: {
    name: { required },
    minValue: { required, minValue: minValue(100) },
  },

  methods: {
    async editCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        try {
          const dataCategoties = {
            id: this.id,
            name: this.name,
            minValue: this.minValue,
          };
          await this.$store.dispatch('editCategory', dataCategoties);
          this.$message(`Категория ${this.name} изменнена`);
          this.$emit('updateCategories', dataCategoties);
          return;
        } catch (e) {
          console.log(`${e} `);
        }
      }
    },
  },

  watch: {
    currency(id) {
      console.log(id);
      this.disabled = false;
      // eslint-disable-next-line array-callback-return
      return (Object.values(this.categories).map((e) => {
        if (e.name === id) {
          this.minValue = e.minValue;
          this.name = e.name;
          this.id = e.id;
          this.form = true;
        }
      }));
    },
  },

  mounted() {
    // eslint-disable-next-line no-undef
    M.AutoInit();
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },

};
</script>
