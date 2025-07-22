import Login from '../models/LoginModel.js';

function index (req, res) {
  if(req.session.user) return res.render('logado');
  return res.render('login');
};

async function register(req,res) {
  try{
    const login = new Login(req.body);
    await login.register();
  
    if(login.erros.length > 0){
      req.flash('erros', login.erros);
      req.session.save(function(){
        return res.redirect('/login/index');  
      });
      return;
    }

    await login.logar();

    if (login.erros.lenght > 0){
      req.flash('erros', login.erros);
      req.session.save(function(){
        return res.redirect('/login/index');
      })
      return;
    }

    req.flash('sucesso', 'Sua conta foi criada com sucesso.');
    req.session.user = login.user;
    req.session.save(function(){
      return res.redirect('/login/index');  
    });
  }catch(e){
    console.log(e);
    return res.render('404');
  }
};

async function login(req,res) {
  try{
    const login = new Login(req.body);
    await login.logar();
  
    if(login.erros.length > 0){
      req.flash('erros', login.erros);
      req.session.save(function(){
        return res.redirect('/login/index');  
      });
      return;
    }

    req.flash('sucesso', 'Você entrou no sistema.');
    req.session.user = login.user;
    req.session.save(function(){
      return res.redirect('/login/index');  
    });
  }catch(e){
    console.log(e);
    return res.render('404');
  }
};

function logout(req,res){
  req.session.destroy();
  res.redirect('/');
}


export default{
  index,
  register,
  login,
  logout
}