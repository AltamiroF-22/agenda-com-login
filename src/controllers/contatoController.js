// const { async } = require('regenerator-runtime');
const Contato = require('../modules/contatoModule');

exports.index = (req, res)=> {
    res.render(`contato`, {
        contato:{}
    })
};

exports.register = async(req, res) =>{
    try{

    const contato = new Contato(req.body)
    await contato.register();

   if(contato.errors.length > 0) {
    req.flash('errors', contato.errors)
    req.session.save(() => res.redirect('index'));
    return;
   }

   req.flash('success','Contato registrado com secesso.')
   req.session.save(() => res.redirect(`/contato/index`));
   return;
    }catch(e) {
        console.log(e);
       return res.render('404');
    }
};


exports.editIndex = async(req, res) => {
   try {
    if(!req.params.id) return res.render('parametro');

    const contato = await Contato.buscaPorId(req.params.id);

    if(!contato) return res.render('parametro');

    res.render('contato', {contato});
   }catch(e) {

    console.log(e)
    return res.render('404');
   }
};


exports.edit = async (req, res) => {
    try{

    if(!req.params.id) return res.render('parametro');

    const contato = await new Contato(req.body);

    await contato.edit(req.params.id);

    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors)
        req.session.save(() => res.redirect('index'));
        return;
       }
    
       req.flash('success','Contato editado com secesso.')
       req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
       return;

    }catch(e) {
        console.log(e);
        return res.render('404');
    }


}

exports.delete = async function (req, res) {
    try{

    if(!req.params.id) return res.render('parametro');

    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(() => res.redirect('/'));

    }catch(e) {
        console.log(e)
        res.render('404');
    }
}