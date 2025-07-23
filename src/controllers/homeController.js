import Contato from "../models/ContatoModel.js";

async function index (req,res) {
  const contatos = await Contato.buscaContatos();
  res.render('index', {contatos});
}

export default{
  index
};