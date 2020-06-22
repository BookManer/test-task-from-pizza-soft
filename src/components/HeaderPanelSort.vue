<template>
    <v-menu offset-y>
        <template v-slot:activator="{on}">
            <v-chip v-on="on" class="mr-4">
                Сортировка по 
                <span class="selected-item">{{getSelected}}</span>
                <v-icon class="ml-2">fa fa-sort</v-icon>
            </v-chip>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="onSelect(item)">
                <v-list-item-title>{{ item.value }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import logger from '../helpers/logger';
export default {
    model: {
        prop: 'sortBy',
        event: 'onSelectedSort'
    },
    props: ['sortBy'],
    name: 'HeaderPanelSort',
    data() {
        return {
            items: [
                {type: 'name', value: 'имени'},
                {type: 'birthday', value: 'дате рождения'},
                {type: 'default', value: 'умолчанию'},
            ],
            selected: {type: 'default', valie: 'умолчанию'},
        }
    },
    mounted() {
        this.$emit('onSelectedSort', this.selected);
    },
    computed: {
        getSelected() {
            return !this.sortBy ? 'умолчанию' : this.selected.value;
        } 
    },
    methods: {
        onSelect(item) {
            this.selected = item;
            this.$emit('onSelectedSort', this.selected);
            logger.CHANGED(`Список отсортирован по ${this.selected.value}`);
        }
    }
}
</script>

<style>
    .selected-item { 
        font-weight: bold;
        margin-left: .5rem;
        color: black;
     }
</style>