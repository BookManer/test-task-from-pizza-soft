<template>
    <div class="employees-card">
        <EmployerFooterPanel v-model="employees"></EmployerFooterPanel>
        <EmployerHeaderPanel v-model="employees"></EmployerHeaderPanel>
        <EmployerList :employees="employees"></EmployerList>
    </div>
</template>

<script>
import store from '../store/index.js';

import EmployerHeaderPanel from '../components/EmployerHeaderPanel.vue';
import EmployerList from '../components/EmployerList.vue';
import EmployerFooterPanel from '../components/EmployerFooterPanel.vue';

import logger from '../helpers/logger.js';

export default {
    name: 'Home',
    data() {
        return {
            employees: [],
            isLoading: false,
        }
    },
    async created() {
        await this.$store.dispatch('init')
            .catch((err) => logger.ERROR(err));
        this.employees = this.$store.state.employees;
        this.isLoading = false;
    },
    components: {
        EmployerHeaderPanel,
        EmployerList,
        EmployerFooterPanel,
    }
}
</script>

<style lang="scss">
    .employees-card { 
        padding: 25px 50px;

        @media all and (max-width: 960px) {
            padding: 25px;
        }

        @media all and (max-width: 640px) {
            padding: 10px;
        }
    }
</style>