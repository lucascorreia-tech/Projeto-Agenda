import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Como vai ficar no Banco de dados
const LoginSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body;
    this.erros = [];
    this.user = null;
  }

  async register(){
    this.#valida();
    if(this.erros.length > 0) return;

    await this.#userExists();

    if(this.erros.length > 0) return;
    // Hash da senha (Para segurança)
    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    try{
       this.user = await LoginModel.create(this.body);
    } catch(e){
      console.log(e);
    }
  }

  async #userExists(){
    const user = await LoginModel.findOne({ email: this.body.email});
    if(user) this.erros.push('O usuário já existe !!!');
  }

  #valida(){
    this.#cleanUp();

    // Validação
    // O e-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.erros.push('Email inválido');

    // A senha precisa ter entre 3 e 50
    if(this.body.password.length < 3 || this.body.password.length > 50){
      this.erros.push('A senha precisa ter entre 3 e 50 caracteres');
    }
  }

  #cleanUp(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      };
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

export default Login;