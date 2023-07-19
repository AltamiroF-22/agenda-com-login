import validator from "validator";

export default class Login {

    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.removeErrorMessages();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let erro = false;

        if (!validator.isEmail(emailInput.value)) {
            this.criaErro(emailInput, 'E-mail inválido');
            erro = true; 
        }
        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.criaErro(passwordInput, 'Senha inválida');
            erro = true; 
        }

        if (!erro) {
            el.submit();
        }
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('erro-text');
        div.style.color = "#ef3737"
        campo.insertAdjacentElement('afterend', div);
    }

    removeErrorMessages() {
        const errorMessages = this.form.querySelectorAll('.erro-text');
        errorMessages.forEach(errorMessage => {
            errorMessage.remove();
        });
    }
}
