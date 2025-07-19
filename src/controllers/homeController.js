function index (req,res) {
  res.render('index', {
    titulo: 'Página Inical'
  });
}

export default{
  index
};