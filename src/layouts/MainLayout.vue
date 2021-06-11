<template>

<Loader v-if="loading" />

<div v-else>
  <div class="app-main-layout">

    <Navbar @menuInvisible="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" :key="locale"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">

        <router-view/>

      </div>
    </main>

  <div class="fixed-action-btn">
    <router-link class="btn-floating btn-large blue" to="/record">
      <i class="large material-icons">add</i>
    </router-link>
  </div>

  </div>
</div>
</template>

<script>
import messages from '@/plugins/message';
import Sidebar from '../components/app/Sidebar.vue';
import Navbar from '../components/app/Navbar.vue';

export default {
  name: 'main-layout',

  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },

  async mounted() {
    if (!Object.keys(this.$store.getters.gInfo).length) {
      await this.$store.dispatch('fetchInfo');
    }

    this.loading = false;
  },

  computed: {
    error() {
      return this.$store.getters.getError;
    },
    locale() {
      return this.$store.getters.gInfo.lang;
    },
  },

  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что то пошло не так');
    },
  },

  components: {
    Navbar, Sidebar,
  },

};
</script>
