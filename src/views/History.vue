<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!items.length">
      Нет записей.
      <router-link to="/record"> Cоздать </router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'">
      >
      </Paginate>
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixins';
import HistoryTable from '@/components/HistoryTable.vue';
import { Pie } from 'vue-chartjs';

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      categories: [],
      loading: true,
    };
  },

  async mounted() {
    this.categories = await this.$store.dispatch('getListsCategory');
    const records = await this.$store.dispatch('getListRecord');
    this.setup(records);

    this.loading = false;
  },

  components: {
    HistoryTable,
  },

  methods: {
    setup(records) {
      if (records.length) {
        this.setupPagination(records.map((rec) => {
          const cat = this.categories.find((r) => r.id === rec.id).name;
          return {
            ...rec,
            categorieName: cat,
            typeClass: rec.type === 'income' ? 'green' : 'red',
            typeText: rec.type === 'income' ? 'Приход' : 'Расход',
          };
        }));
      }

      this.renderChart({
        labels: this.categories.map((c) => c.name),
        datasets: [{
          label: '#',
          data: this.categories.map((c) => records.reduce((total, r) => {
            if (r.id === c.id && r.type === 'outcome') {
              // eslint-disable-next-line no-param-reassign
              total += +r.amount;
            }
            return total;
          }, 0)),

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      });
    },

  },
};
</script>
