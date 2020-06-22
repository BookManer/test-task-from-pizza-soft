export default {
    created() {
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
}