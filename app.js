const app = Vue.createApp({
    data() {
        return {
            message: 'hello',
            users: [],
            error: [],
            name: '',
            email: '',
            password: '',
            form: {
                'name': '',
                'email': '',
                'password': '',
            },
            updateForm: {},
            deleteid: {
                id: '',
            },
            addmessage: '',
            server_failed: '',
            updateModal: false,
            deleteMessage : '',
        }
    },
    methods: {
        allUser: function () {
            data = this;
            axios.get('http://localhost/vue-crud-php/conn.php?action=read')
                .then(function (response) {
                    // handle success
                    data.users = response.data.users;
                    //   console.log(response.data.users);
                })
        },
        addUser: function () {
            if (!this.form.name) {
                app.error = [
                    { name: '*Name Required' },
                ]
                return;
            }
            if (!this.form.email) {
                app.error = [
                    { email: '*Email Required' },
                ]
                return;
            }
            let formdata = this.toFormdata(app.form);
            axios.post("http://localhost/vue-crud-php/conn.php?action=create", formdata)
                .then(function (response) {
                    if (response.data.error == false) {
                        app.addmessage = response.data.message;
                        app.form.name = null;
                        app.form.email = null;
                        app.form.password = null;
                        app.allUser();
                    }
                })
                .catch(function (response) {
                    app.addmessage = null;
                    app.server_failed = 'failed';
                });
        },
        editData: function (user) {
            app.updateForm = user;
        },
        updateUser: function () {
            let formdata = this.toFormdata(app.updateForm);
            axios.post("http://localhost/vue-crud-php/conn.php?action=update", formdata)
                .then(function (response) {
                    if (response.data.error == false) {
                        app.addmessage = response.data.message;
                        app.allUser();
                    }

                })
                .catch(function (response) {
                    app.addmessage = null;
                    app.server_failed = 'failed';
                });
        },
        deleteData: function (id) {

            app.deleteid.id = id;
            let formdata = this.toFormdata(app.deleteid);
            axios.post("http://localhost/vue-crud-php/conn.php?action=delete", formdata)
                .then(function (response) {
                    if (response.data.error == false) {
                        app.deleteMessage = response.data.message;
                        app.allUser();
                    }

                })
                .catch(function (response) {
                    app.addmessage = null;
                    app.server_failed = 'failed';
                });

        },
        toFormdata: function (obj) {
            let data = new FormData();
            for (let key in obj) {
                data.append(key, obj[key]);
            }
            return data;
        }
    },
    mounted() {
        this.allUser();
    },
}).mount('#app')