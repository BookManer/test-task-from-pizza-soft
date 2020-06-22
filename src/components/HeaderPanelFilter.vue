<template>
    <v-menu offset-y :close-on-content-click="false"> 
        <template v-slot:activator="{on}">
            <v-chip v-on="on" class="badge-filter">
                Фильтровать
                <v-badge color="blue" dot inline v-if="isFiltered"></v-badge>
                <v-icon class="ml-2" size="small">fa fa-filter</v-icon>
            </v-chip>
        </template>
        <v-list>
            <v-list-item @click="">
                <v-menu offset-y>
                    <template v-slot:activator="{on:onClick}">
                        <v-list-item-title class="filter-item" v-on="onClick">
                            <span class="role-item">
                                Должности
                                <v-icon class="ml-2">fa fa-caret-down</v-icon>
                            </span>
                            <div class="filter-roles">
                                <v-chip class="role" v-for="({name, type},index) in arrActiveFilterBy"
                                :key="index"
                                close
                                @click:close="onCloseFilter(type)">{{name}}</v-chip>
                            </div>
                        </v-list-item-title>
                    </template>
                    <v-list>
                        <v-list-item v-for="({type,name}, index) in filterBy"
                            :key="index"
                            @click="onFilterBy(type)">{{name}}</v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item>
            <v-list-item>
                <v-checkbox v-model="isArhive" label="Занесён в архив"></v-checkbox>
            </v-list-item>
            <v-list-item>
                <v-btn @click="onAcceptFilter">
                    Применить
                </v-btn>
                <v-btn text color='error' @click="onResetFilters">
                    Отменить
                </v-btn>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import logger from '../helpers/logger.js';

export default {
    model: {
        prop: 'value',
        event: 'onFiltered',
    },
    props: ['employees'],
    name: 'HeaderPanelFilter',
    data() {
        return {
            filterBy: [{
                isActive: false,
                type: 'driver',
                name: 'Водитель'
            }, {
                isActive: false,
                type: 'cook',
                name: 'Повар',
            }, {
                isActive: false,
                type: 'waiter',
                name: 'Официант'
            }],
            isArhive: false,
        }
    },
    mounted() {
        this.$emit('onFiltered', this.employees);
    },
    computed: {
        arrActiveFilterBy() {   
            return this.filterBy
                .filter(({isActive, name}) => {
                    if (isActive) {
                        logger.SUCCESS(`Фильтрация по должностям: ${name}`);
                    }
                    return isActive
                });
        },
        isFiltered() {
            return this.arrActiveFilterBy.length !== 0 || this.isArhive;
        }
    },
    methods: {
        onFilterBy(role) {
            const arr = this.filterBy
                .filter(({type}) => type === role)
                .forEach((roleFilter) => roleFilter.isActive = true);
        },
        onCloseFilter(role) {
            const arr = this.filterBy
                .filter(({type}) => type === role)
                .forEach((roleFilter) => roleFilter.isActive = false);
        },
        onAcceptFilter() {
            let emplFiltered = [...this.$store.state.employees];

            emplFiltered = emplFiltered
                .filter(({role, isArchive}) => {
                    let arr = this.arrActiveFilterBy.map(({type}) => type);
                    let hasRoles = arr.includes(role);
                    let hasArchive = isArchive === this.isArhive;

                    return (hasRoles && hasArchive);
                })

            logger.SUCCESS('Список отфильтрован');
            this.$emit('onFiltered', emplFiltered.length === 0 ? [...this.$store.state.employees] : emplFiltered);
        },
        onResetFilters() {
            this.isArhive = false;
            this.filterBy.forEach((role) => role.isActive = false);
            this.$emit('onFiltered', [...this.$store.state.employees]);
            logger.WARN('Фильтры сброшены');
        }
    },
}
</script>

<style>
    @media all and (max-width: 320px) {
        .badge-filter { margin-top: 0.5rem; }
    }
    .filter-item { 
        display: flex; flex-flow: column nowrap;
    }
    .filter-roles {
        display: flex;
        margin-top: .5rem;
    }
    .role:not(:first-of-type) {
        margin-left: 0.5rem;
    }
    .role-item { display: flex; align-items: center; }
</style>