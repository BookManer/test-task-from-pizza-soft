<template>
  <EmptyLayout>
    <router-view v-if="!isLoading"></router-view>
  </EmptyLayout>
</template>

<script>
import EmptyLayout from './views/EmptyLayout.vue';
import logger from './helpers/logger.js';

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
    }
  },
  async created() {
        await this.$store.dispatch('init')
            .catch((err) => logger.ERROR(err));
        this.isLoading = false;
    },
  components: {EmptyLayout}
};
</script>
