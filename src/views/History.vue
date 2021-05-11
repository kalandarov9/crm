<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="rec in records" :key="rec.id">
          <td>{{ rec.count }}</td>
          <td>{{ rec.amount | currency()}} </td>
          <td>{{ JSON.parse(rec.date) }}</td>
          <td>{{rec.categorieName}} </td>
          <td>
            <span
            class="white-text badge"
            :class="(rec.type === 'income') ? 'green' : 'red'"
            >{{rec.type}}</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>

        </tbody>
      </table>

    </section>
  </div>
</template>

<script>
export default {
  name: 'history',
  data() {
    return {
      records: null,
      count: 0,
    };
  },

  async mounted() {
    const categories = await this.$store.dispatch('getListsCategory');
    const records = await this.$store.dispatch('getListRecord');

    this.records = records.map((rec) => {
      this.count += 1;
      const cat = categories.filter((r) => r.id === rec.id);
      return {
        count: this.count,
        amount: rec.amount,
        categorieName: cat[0].name,
        date: rec.date,
        type: rec.type,
      };
    });
  },
};
</script>
