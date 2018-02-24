module.exports.jogo = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não logado. Faça o login para acessar o jogo.');    
        return;    
    }

    var comando_invalido = 'N';
    if(req.query.comando_invalido == 'S'){
        comando_invalido = 'S';
    }

    var UsuariosDAO = new application.app.models.UsuariosDAO();
    var JogoDAO = new application.app.models.JogoDAO();
    var usuario = req.session.usuario;
    var casa = req.session.casa;

    JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render('index', {validacao: {}});
    });
}

module.exports.suditos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não logado. Faça o login para acessar o jogo.');    
        return;    
    }

    res.render('aldeoes', {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não logado. Faça o login para acessar o jogo.');    
        return;    
    }

    res.render('pergaminhos', {validacao: {}});
}

module.exports.ordenar_acao_sudito = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário não logado. Faça o login para acessar o jogo.');    
        return;    
    }
    
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada.').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada.').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?comando_invalido=S');
        return;
    }

    console.log(dadosForm);
    res.send('Tudo Ok!');
}