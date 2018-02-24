module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao: {}, dadosForm:{}});
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Nome não pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
        return;
    }

    var UsuariosDAO = new application.app.models.UsuariosDAO();
    UsuariosDAO.inserirUsuario(dadosForm);

    var JogoDAO = new application.app.models.JogoDAO();
    JogoDAO.gerarParamentros(dadosForm.usuario);

    res.send('Formulário enviado com sucesso!');
}