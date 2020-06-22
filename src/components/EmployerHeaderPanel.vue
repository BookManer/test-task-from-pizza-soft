<template>
  <div class="header-panel">
    <div class="header-panel__ group-actions group-actions">
      <header-panel-sort v-model="sortBy"></header-panel-sort>
      <header-panel-filter v-model="filterBy"
        :employees="sortEmployees(sortBy.type)"></header-panel-filter>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js';

import HeaderPanelFilter from './HeaderPanelFilter.vue';
import HeaderPanelSort from './HeaderPanelSort.vue';

import {toYearMonthDay, parseDate} from '../helpers/date.js';

export default {
  model: {
    prop: 'value',
    event: 'onFilterAndSortEmployees'
  },
  name: 'EmployerHeaderPanel',
  data() {
    return {
      sortBy: '',
      filterBy: [],
    }
  },
  updated() {
    this.$emit('onFilterAndSortEmployees', this.sortEmployees(this.sortBy.type));
  },
  methods: {
    sortEmployees(type) {
      let emp = [...this.filterBy].length === 0 
        ? [...store.state.employees]
        : [...this.filterBy];

      if (type === 'name') {
          emp.sort(function compare({name:leftName}, {name:rightName}) {
            if (leftName > rightName) { return 1; }
            else if (leftName < rightName) { return -1; }
            return 0;
          });
      } else if (type === 'birthday') {
          emp.sort(function compare({birthday: lBirthday}, {birthday: rBirthday}) {
            lBirthday = toYearMonthDay(lBirthday, '.', '-');
            rBirthday = toYearMonthDay(rBirthday, '.', '-');
            return (lBirthday<rBirthday) ? -1 : (lBirthday>rBirthday) ? 1 : 0;
          });
      }

      return emp;
    }
  },
  components: {HeaderPanelSort,HeaderPanelFilter}
}
</script>

<style lang="scss">
  .header-panel {
    margin-bottom: .5rem;
    &__sort-by {
      width: fit-content;
    }
  }
</style>