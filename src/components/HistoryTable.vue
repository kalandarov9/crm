<template>
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

      <tr v-for="(rec, idx) in records" :key="rec.key">
        <td>{{ (idx += 1) }}</td>
        <td>{{ rec.amount | currency('RUB') }}</td>
        <!-- <td>{{ rec.date | date('date') }}</td> -->
        <td>{{ $moment(rec.date).locale('ru').format('MM-DD-YYYY hh:mm:ss') }}</td>

        <td>{{ rec.categorieName }}</td>
        <td>
          <span class="white-text badge" :class="[rec.typeClass]">{{
            rec.typeText
          }}</span>
        </td>
        <td>
          <button class="btn-small btn"
          v-tooltip="'Посмотреть запись'"
          @click="$router.push('/detail/' + rec.idRecord)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue';

const moment = require('moment');

export default Vue.extend({
  data() {
    return {
      monent: moment,
      date: null,
    };
  },
  props: {
    records: {
      require: true,
      type: Array,
    },
  },

  mounted() {
    this.data = this.$moment(this.records[0].date).locale('ru').format('MM-DD-YYYY hh:mm:ss');
  },
});
</script>
