const { async } = require('regenerator-runtime');
const Contato = require('../modules/contatoModule');

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', {contatos});
    return;
};
