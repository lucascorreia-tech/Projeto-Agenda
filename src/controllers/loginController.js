import Login from '../models/LoginModel.js';

function index (req, res) {
  res.render('login');
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

    req.flash('sucesso', 'Sua conta foi criada com sucesso.');
    req.session.save(function(){
      return res.redirect('/login/index');  
    });
  }catch(e){
    console.log(e);
    return res.render('404');
  }
};


export default{
  index,
  register
}