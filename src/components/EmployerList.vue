<template>
    <div class="overflow-block">
        <EmployerItem 
            v-for="(employer, index) in employees"
            :key="index"
            :employer="employer"></EmployerItem>
    </div>
</template>

<script>
import EmployerItem from './EmployerItem.vue';

export default {
    props: ['employees'],
    name: 'EmployerList',
    components: {EmployerItem}
}
</script>

<style>
    .overflow-block {
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        overflow-y: scroll;
    }
</style>