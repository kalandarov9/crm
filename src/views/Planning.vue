<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency()}}</h4>
    </div>
    <section>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.name }} </strong>
          {{ cat.res | currency }} из {{ cat.minValue | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.procent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

export default {
  name: 'planning',

  data() {
    return {
      bill: null,
      categories: null,
      records: null,
    };
  },

  computed: {
    ...mapGetters(['info']),
  },

  async mounted() {
    const categories = await this.$store.dispatch('getListsCategory');
    const records = await this.$store.dispatch('getListRecord');

    this.categories = categories.map((cat) => {
      const res = records
        .filter((r) => r.id === cat.id)
        .reduce((total, record) => {
          if (record.type === 'outcome') {
            return total + record.amount;
          }
          return total;
        }, 0);

      const procent = (+res / +cat.minValue) * 100;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = (procent < 60) ? 'green'
        : (procent < 90) ? 'yellow' : 'red';

      const tooltipValue = cat.minValue - res;
      const tooltip = (tooltipValue > 0) ? `Осталось потратить: ${currencyFilter(tooltipValue)}` : `Привысили лимит на ${currencyFilter(tooltipValue)} `;

      return {
        ...cat,
        res,
        procent,
        progressColor,
        tooltip,
      };
    });
  },
};

</script>
