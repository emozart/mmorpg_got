module.exports.home = function(application, req, res){
    res.render('index');
}

module.exports.autenticar = function(application, req, res){
    dodosForm = req.body;

    req.assert('usuario', 'Usuário é obrigatório.').notEmpty();
    req.assert('senha', 'Usuário é obrigatório.').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    res.send('Tudo Ok para iniciar a sessão.');
}