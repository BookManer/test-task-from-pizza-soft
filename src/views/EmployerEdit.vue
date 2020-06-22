<template>
    <div class="employer-edit">
        <h1 class="title-form">Редактировать сотрудника <v-btn class="btn-back" @click="$router.go(-1)" color="error">на главную</v-btn></h1>
        <EmployerForm type="edit"></EmployerForm>
    </div>
</template>

<script>
import EmployerForm from '../components/EmployerForm.vue';

export default {
    name: 'EmployerEdit',
    components: {EmployerForm},
}
</script>

<style lang="scss">
    .btn-back {
        margin-left: 1rem;
    }
    @media all and (max-width: 480px) {
        .employer-edit .title-form {
           font-size: 1.5rem;
           margin: 1rem;
        }
        .btn-back {
            margin-left: 0;
            margin-top: 1rem;
            span { font-size: .6rem; }
        }
    }
</style>