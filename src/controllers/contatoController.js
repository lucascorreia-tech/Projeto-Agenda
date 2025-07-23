import Contato from "../models/ContatoModel.js";

function index(req,res){
  res.render('contato', {
    contato: {}
  });
};

async function register(req,res){
  try{
    const contato = new Contato(req.body);
    await contato.register();

    if(contato.erros.length > 0){
      req.flash('erros', contato.erros);
      req.session.save(() => res.redirect('/contato/index'));
      return;
    }

    req.flash('sucesso', 'Contato registado com sucesso !!');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    return;
  }catch(e){
    console.log(e);
    res.render('404');
  }
};

async function edit(req,res){
  if(!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);
  if(!contato) return res.render('404');
  res.render('contato', {contato});
}

export default{
  index,
  register,
  edit
};