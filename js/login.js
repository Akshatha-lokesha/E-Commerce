import { views } from "./views.js";

class Login {
    constructor() {
        this.loginMessage = $('#loginMessage');
        this.views = new views();
        this.views.bindLoginSubmit(this.handleSubmit.bind(this));
    }
    

    handleSubmit(username, password) {
        this.loginMessage.text('');
        if (username === '' || password === '') {
            this.loginMessage.text('Please fill in both fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'index.html';
        } else {
            this.loginMessage.html('Incorrect username or password. Please try again or <a href="register.html">register</a>.');
        }
    }
}

$(document).ready(function () {
    new Login();
});
