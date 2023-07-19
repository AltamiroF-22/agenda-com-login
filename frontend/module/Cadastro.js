import validator from "validator";
export default class Cadastro {

    constructor(formClass){

        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form)return;

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.removeMenssagens();
            this.validate(e);
        })

    }


    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefone = el.querySelector('input[name="telefone"]');
        let  erro = false;

        if(nomeInput.value.length < 1){
            this.criaErro(nomeInput , 'Nome é requerido');
            erro = true;
        }

        if(emailInput.value.length > 0) {
            if (!validator.isEmail(emailInput.value)) {
                this.criaErro(emailInput, 'E-mail inválido');
                erro = true; 
            }
        }
        if(telefone.value.length > 0 ){
            if(telefone.value.length > 20){
                this.criaErro(telefone,  'Telefones acima de 20 números não seram aceitos!')
                erro= true;
            }
        }

        if(telefone.value.length < 1 && emailInput.value.length < 1) {
            this.criaErro(telefone , 'Por favor adicione pelo menos um email ou um telefone para criar um contato.');
            this.criaErro(emailInput , 'Por favor adicione pelo menos um email ou um telefone para criar um contato.');
            erro = true;
        }
       
    

        if(!erro){
            el.submit();
        }

    }


    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('erro');
        div.style.color = '#ef3737';
        campo.insertAdjacentElement('afterend', div);

    }

    removeMenssagens(){
        const errosMenssagens = this.form.querySelectorAll('.erro');
        errosMenssagens.forEach(erroMenssagen => {
            erroMenssagen.remove();
        })
    }
}