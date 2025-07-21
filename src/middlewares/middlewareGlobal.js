export const middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash('erros');
  res.locals.sucesso = req.flash('sucesso');
  res.locals.user = req.session.user;
  next();
};

export const checkCsrfError = (err, req, res, next) => {
  if (err) {
    console.error('Middleware checkCsrfError capturou erro:', err);
    return res.status(404).render('404');
  }
  next();
};


export const csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

export const loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
};
