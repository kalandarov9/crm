<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="submit">
      <div class="input-field" >
        <select v-model="category">
          <option
          v-for="c in categories"
          :key="c.id"
          :value="c.name"
          >{{c.name}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
          checked
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.required)}"
        >
        <label for="amount">Сумма</label>
        <span
          class="helper-text "
          :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) ||
              ($v.amount.$dirty && !$v.amount.required)}"
        >Amount</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text"
            :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
        >Description</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

// const checkNumber = async (value) => {
//   const res = await this.$store.dispatch('mauthBill', {
//     type: this.type,
//     amount: this.amount,
//   });
//   console.log(res);
//   console.log(value);
// };

export default {
  data() {
    return {
      categories: [],
      category: null,
      type: 'income',
      amount: null,
      description: null,
    };
  },

  validations: {
    type: { required },
    amount: { required, minValue: minValue(1) },
    description: {
      required,
    },
  },

  methods: {
    async myVal() {
      console.log('s');
      await this.$store.dispatch('mauthBill', {
        type: this.type,
        amount: this.amount,
      });
    },

    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        try {
          const res = await this.$store.dispatch('mauthBill', {
            type: this.type,
            amount: this.amount,
          });
          if (res === false) {
            this.$message('Вы вышли за пределы своего бюджета');
            return;
          }
          const dataRecord = {
            name: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: JSON.stringify(new Date()),
          };
          await this.$store.dispatch('addRecord', dataRecord);
          this.$message(`Запись для ${this.category} созданна`);
          this.amount = '';
          this.description = '';
          this.$v.$reset();
          return;
        } catch (e) {
          console.log(e);
        }
      }
    },
  },

  async mounted() {
    this.categories = await this.$store.dispatch('getListsCategory');
    // eslint-disable-next-line no-undef
    M.updateTextFields();

    if (this.categories.length) {
      this.category = this.categories[0].name;
    }
    // eslint-disable-next-line no-undef
    setTimeout(() => { M.AutoInit(); }, 0);
  },

};
</script>
