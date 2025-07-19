function paginaInicial (req,res) {
  res.render('index', {
    titulo: 'Página Inical'
  });
}

export default{
  paginaInicial
};