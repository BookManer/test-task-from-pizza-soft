<template>
    <div class="employer-form">
        <div class="employer-form__group">
            <label for="name" class="employer-form__title"><b>Имя:</b></label>
            <input type="text" v-model="form.name" id="name" class="employer-form__input" required>
            <v-chip
                class="ma-2 employer-form__error-message"
                color="red"
                text-color="white"
                v-if="$v.form.name.$invalid && checkedAllValid">
                Как Вас звать по имени?
            </v-chip>
        </div>
        <div class="employer-form__group">
            <label for="role" class="employer-form__title"><b>Должность:</b></label>
            <v-select id="role"
                v-model="form.role"
                class="employer-form__input"
                :items="['cook','waiter','driver']"></v-select>
            <v-chip
                class="ma-2 employer-form__error-message"
                color="red"
                text-color="white"
                v-if="$v.form.role.$invalid && checkedAllValid">
                Нужно обязательно выбрать должность
            </v-chip>
        </div>
        <div class="employer-form__group">
            <label for="phone" class="employer-form__title"><b>Телефон +7:</b></label>
            <input type="tel" autocomplete="tel" v-model="form.phone" v-phone pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2}" required id="phone" class="employer-form__input">
            <v-chip
                class="ma-2 employer-form__error-message"
                color="red"
                text-color="white"
                v-if="$v.form.phone.$invalid && checkedAllValid">
                Номер указан не до конца. (900) 000-00-00
            </v-chip>
        </div>
        <div class="employer-form__group">
            <label for="birthday" class="employer-form__title"><b>Дата рождения:</b></label>
            <v-text-field id="birthday" type="date" v-model="form.birthday" class="employer-form__input"></v-text-field>
            <v-chip
                class="ma-2 employer-form__error-message"
                color="red"
                text-color="white"
                v-if="$v.form.birthday.$invalid && checkedAllValid">
                Это нужно чтоб поздравить тебя в твой день :)
            </v-chip>
        </div>
        <div class="employer-form__group">
            <v-checkbox class="employer-form__input" v-model="form.isArchive" label="в архиве"></v-checkbox>
            <v-btn v-if="type === 'add'" color="success" @click="onAddEmployer">Добавить</v-btn>
            <v-btn v-else color="primary" :disabled="editDisabled" @click="onEditEmployer">Изменить</v-btn>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { required } from 'vuelidate/lib/validators';
import watchChangedEdit from '../mixins/watchChangedEdit.js';
import {toDayMonthYear, parseFormat, toYearMonthDay} from '../helpers/date.js';
import logger from '../helpers/logger';

const customPhone = (value) => {
  const regxpMatch = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

  return regxpMatch.length === 5 && regxpMatch[4].length === 2;
}

Vue.directive('phone', {
  bind(el) {  
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }

      let x = this.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] + (x[4] ? '-' + x[4] : '') : '');
      el.dispatchEvent(new Event('input'));
    }
  }
});

export default {
    model: {
        prop: 'form',
        event: 'onSendForm',
    },
    props: ['type'],
    name: 'EmployerForm',
    data() {
    return {
      form: {
        name: '',
        role: '',
        phone: '',
        birthday: '',
        isArchive: false,
      },
      checkedAllValid: false,
      editDisabled: false,
    };
  },
  created() {
      if (this.type === 'edit') {
        this.onWatchEditChanged();
        const {id} = this.$route.params;
        const employer = [...this.$store.state.employees]
            .filter(({id:id_employer}) => {
                return id_employer == id;
            })[0];
        let {name,role,phone,birthday,isArchive} = employer;
        if (birthday.indexOf('.') !== -1) {
          let parsed = birthday.replace(/\./g, '-');
          let reversed = parsed.split('-').reverse();
          let completed = reversed.join('-');
          employer.birthday = completed;
        }

        this.form = {...employer};
      }
  },
  methods: {
    onWatchEditChanged() {
        this.$watch(`$data.form`, (newForm) => {
            const {id} = this.$route.params;
            const storeEmployer = [...this.$store.state.employees]
                .filter(({id:id_employer}) => {
                    return id_employer == id;
                })[0];
            const {name:sName, role:sRole,birthday:sBirthday,
                 phone:sPhone, isArchive:sIsArchive} = storeEmployer;
            const {name,role,birthday,phone,isArchive} = newForm;
            if (sName != name || sRole !==role || sBirthday != birthday ||
                sPhone != phone || sIsArchive != isArchive) {
                this.editDisabled = false;
            } else {
                this.editDisabled = true;
            }
        }, { deep: true });
    },
    onAddEmployer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.checkedAllValid = false;
        let {name,role,phone,birthday,isArchive} = this.form;
        const employees = this.$store.state.employees; 
        role = role.toLowerCase();
        if (role === 'официант') { role = 'waiter'; }
        else if (role === 'повар') { role = 'cook'; }
        else if (role === 'водитель') { role = 'driver'; }

        birthday = parseFormat(toDayMonthYear(birthday, '-'));

        const newEmployer = {
          id: employees.length+1, name, role, phone, birthday, isArchive,
        };

        this.$store.commit('SET_EMPLOYEES', [newEmployer, ...employees]);
        this.$emit('onSendForm', [...this.$store.state.employees]);
        // Reset a form fields's value
        Object.entries(this.form)
          .forEach(([prop, val]) => { this.form[prop] = ''; });

        logger.SUCCESS(`Добавлен новый сотрудник ${name}`);
      } else {
        this.checkedAllValid = true;
      }
    },
    onEditEmployer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.checkedAllValid = false;
        const options = {
          id: this.$route.params.id,
          payload: this.form,
        } 

        this.$store.commit('UPDATE_EMPLOYER_BY_ID', options);
        this.$emit('onSendForm', [...this.$store.state.employees]);
        logger.CHANGED(`Сотрудник ${this.form.name} изменил личные данные`);
        this.$router.go(-1);
      } else {
        this.checkedAllValid = true;
      }
    }
  },
  validations: {
    form: {
      name: {required},
      role: {required},
      phone: {customPhone},
      birthday: {required},
    }
  }
}
</script>

<style lang="scss">
  @media all and (max-width: 720px) {
    .employer-form {
      &__group {
        position: relative;
        flex-wrap: wrap;
        max-width: 100%;
      }
      &__error-message {
        width: 100%;
        font-size: .8rem !important;
      }
    }
  }

  @media all and (max-width: 480px) {
    .employer-form {
      &__group { margin-bottom: 1rem; }
      &__title, &__input {
        font-size: .8rem;
      }
    }
  }
</style>