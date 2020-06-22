<template>
  <div>
    <h1 class="mb-2 title-form">Добавить нового сотрудника</h1>
    <EmployerForm type="add" v-model="employees"></EmployerForm>
  </div>
</template>

<script>
import EmployerForm from './EmployerForm.vue';

export default {
  name: 'EmployerFooterPanel',
  model: {
    prop: 'value',
    event: 'onTakeEmployees',
  },
  data() {
    return {
      employees: []
    }
  },
  updated() {
    this.$emit('onTakeEmployees', this.employees);
  },
  components: {EmployerForm}
}
</script>

<style lang="scss">
  .employer-form {
    display: flex;
    flex-flow: column nowrap;
    padding: 20px 10px;
    background-color: rgba(140, 140, 240, .15);
    margin: 10px 0;
    &__group {
      display: flex;
      align-items: center;
    }
    &__title,
    &__input {
      padding: 5px;
      max-width: 320px;
      margin-right: 10px;
      &[type='tel'],
      &[type='text'] { border-bottom: 1px solid gray; }
    }
    #name { flex: 0 1 100px; }
  }

  @media all and (max-width: 560px) {
    .title-form {
      font-size: 1.5rem;
      line-height: 1;
    }
  }
</style>