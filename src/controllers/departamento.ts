// Arquivo src/controllers/departamento.ts
import { Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';

const index =async (req: Request, res: Response) => {
    const departamentos = await Departamentos.findAll();
    res.render('departamento/index',{
        departamentos: departamentos.map((d) => d.toJSON()),
        
    } );
    
}

const create =async (req: Request, res: Response) => {
    if (req.route.methods.get){
        res.render('departamento/create',{csrf: req.csrfToken()

        });
    }else{
        const departamento = req.body;
        try {
            await Departamentos.create(departamento);
            res.redirect("/dept")//rota
        } catch (e: any){
            console.log(e);
            res.render("departamento/create", {
                csrf: req.csrfToken(),
                departamento,
                errors: e.errors,
        });
    }
}

}

const update =  async (req: Request, res: Response) => {
  if (req.route.methods.get) {
      const departamento = await Departamentos.findByPk(req.params.id);
      if(departamento){
          res.render('departamento/update',{csrf: req.csrfToken(),
              departamento: departamento.toJSON()
          });
      }else{
          res.redirect('/dept');
      }
  }else{
      const departamento = req.body;
      try {
          await Departamentos.update(departamento, {where: {id: req.params.id}});
          res.redirect('/dept');
      } catch (err: any){
          console.log(err);
          res.render('departamento/update', {csrf: req.csrfToken(),
              departamento,
              erros: err.errors,
          });
      }
  }
};

/*const remove = async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    try {
      await Departamentos.destroy({ where: { id: departmentId } });
      res.redirect("/dept/:id/remove"); // Redireciona para a página principal de departamentos
    } catch (error) {
      console.log(error);
      // Lida com possíveis erros ao remover o departamento
      res.redirect("/departamento"); // Redireciona para a página 
    }
  };*/

  const remove = async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    try {
      await Departamentos.destroy({ where: { id: departmentId } });
      res.redirect('/dept');
    } catch (error) {
      console.log(error);
      res.redirect('/dept');
    }
  };




// ...

  
  

  


//async function index (req: Request, res: Response) {};
async function read (req: Request, res: Response) {};
//async function create (req: Request, res: Response) {};
//async function update (req: Request, res: Response) {};
//async function remove (req: Request, res: Response) {};
export default { index, read, create, update, remove }