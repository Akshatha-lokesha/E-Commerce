import { views } from "./views.js";

class Register {
    constructor() {
        this.registerMessage = $('#registerMessage');
        this.views = new views();
        this.views.bindRegisterSubmit(this.handleSubmit.bind(this));
        //bind(this) referes to thr instance of register class...and not anyother instances
    }

    handleSubmit(username, password) {
        if (!username || !password) {
            this.registerMessage.text('Please fill in both fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username)) {
            this.registerMessage.text('User already registered! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            this.registerMessage.text('Registered successfully! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    }
}

$(document).ready(function () {
    new Register();
});
