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
            addmessage: '',
            server_failed: '',
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

                        console.log(response.data.message);
                        app.addmessage = response.data.message;
                        console.log(app.addmessage);
                    }

                })
                .catch(function (response) {
                    //handle error
                    app.server_failed = 'failed';
                    console.log(response);
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