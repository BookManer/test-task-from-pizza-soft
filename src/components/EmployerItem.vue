<template>
  <div :class="{
    'employer-item': true,
    'employer-item--archive': employer.isArchive,
  }">
    <div class="employer-item__group">
      <b class="employer-item__label">Имя:</b>
      <span class="employer-item__name">{{employer.name}}</span>
    </div>
    <div class="employer-item__group">
      <b class="employer-item__label">Должность:</b>
      <span class="employer-item__role">{{employer.role}}</span>
    </div>
    <div class="employer-item__group" id="group-phone">
      <b class="employer-item__label">Телефон:</b>
      <span class="employer-item__phone">{{employer.phone}}</span>
    </div>
    <div class="employer-item__group">
      <b class="employer-item__label">Дата рождения:</b>
      <span class="employer-item__birthday">{{employer.birthday}}</span>
    </div>
    <p class="employer-item__archive" v-if="employer.isArchive">в архиве</p>
    <v-btn color="primary" class="employer-item__btn-edit" @click="toEditEmployer"><v-icon small>fa fa-edit</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  name: 'EmployerItem',
  props: ['employer'],
  methods: {
    toEditEmployer() {
      const {id} = this.employer;
      this.$router.push({name: 'Employer', params: {id}});
    }
  }
}
</script>

<style lang="scss">
  .employer-item {
    position: relative;
    padding: .5rem;
    margin: 2px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1 1 auto;
    border: 1px solid lightgray;

    &--archive {
      @media all and (max-width: 1200px) {
        background-color: orange;
      }
    }

    &__archive { 
      font-weight: bold;
      color: orange;
      @media all and (max-width: 1200px) {
        display: none;
      }
    }

    &__group {
      display: flex;
      flex-flow: row wrap;
      margin-right: 1rem;
      &:not(:first-of-type) {
        border-left: 1px solid gray;
        padding-left: 1rem;
      }

      @media all and (max-width: 860px) {
        font-size: .85rem;
        margin-right: 0;
        &:not(:first-of-type) { border-left: none; }
      }

      @media all and (max-width: 540px) {
        font-size: .7rem;
      }
    }

    &__group#group-phone {
      @media all and (max-width: 640px) {
        display: none;
      }
    }

    &__label {
      margin-right: 0.5rem;

      @media all and (max-width: 860px) {
        margin-right: 0;
      }
    }
    &__btn-edit {
      margin-left: auto;

      @media all and (max-width: 860px) {
        height: 0 !important;
        min-width: 0 !important;
        padding: 1rem !important;
        i { 
          font-size: 12px !important;
        }
      }

      @media all and (max-width: 640px) {
        position: absolute;
        
        right: 0;
      }
    }
  }
</style>