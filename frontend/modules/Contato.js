import validator from 'validator';

export default class Contato{
  constructor(formContato){
    this.form = document.querySelector(formContato);
  }

  init(){
    this.#events();
  }

  #events(){
    if(!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.#validate(e);
    })
  }

  #validate(e){
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const telInput = el.querySelector('input[name="telefone"]');
    let erro = false

    if(!validator.isEmail(emailInput.value)){
      alert('Email inválido');
      erro = true;
    }

    if(telInput.value.length < 8 || telInput.value.length > 15){
      alert('Telefone inválido, mínimo 8 digitos');
      erro = true;
    }

    if(!erro) el.submit();
    
  }
}