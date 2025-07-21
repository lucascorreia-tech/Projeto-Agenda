import Login from '../models/LoginModel.js';

function index (req, res) {
  res.render('login', {
    erros: req.flash('erros'),
    sucesso: req.flash('sucesso')
  });
};

async function register(req,res) {
  try{
    const login = new Login(req.body);
    await login.register();
  
    if(login.erros.length > 0){
      req.flash('erros', login.erros);
      req.session.save(function(){
        return res.redirect('login');  
      });
      return;
    }

    req.flash('sucesso', 'Sua conta foi criada com sucesso.');
    req.session.save(function(){
      return res.redirect('login');  
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