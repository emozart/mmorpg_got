module.exports.home = function(application, req, res){
    res.render('index', {validacao: {}, usuario: {}});
}

module.exports.autenticar = function(application, req, res){
    dadosForm = req.body;

    req.assert('usuario', 'Usuário é obrigatório.').notEmpty();
    req.assert('senha', 'Usuário é obrigatório.').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros, usuario: dadosForm.usuario});
        return;
    }

    var UsuariosDAO = new application.app.models.UsuariosDAO();
    UsuariosDAO.autenticar(dadosForm, req, res);
}