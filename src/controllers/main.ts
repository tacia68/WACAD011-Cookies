//controller/main.ts

import { NextFunction, Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';

import { Funcionarios } from '../models/Funcionarios';

import bcrypt from 'bcryptjs';
  

const index = (req: Request, res: Response) => {
  res.render('main/index');
};

const about = (req: Request, res: Response) => {
  res.render('main/about');
};

const ui = (req: Request, res: Response) => {
  res.render('main/ui');
};


const signup = async (req: Request, res: Response) => {

  const  departamentos = await Departamentos.findAll();

  if (req.route.methods.get){
    res.render("main/signup", {
      csrf: req.csrfToken(),
      departamentos: departamentos.map((d) => d.toJSON()),
    });
  } else{
    const funcionario = req.body;
   


    try{
      const rounds = parseInt(process.env.BCRYPT_ROUNDS!, 10);
      bcrypt.genSalt(rounds, async(err, salt) => {
        
        if (!err){
          await Funcionarios.create({
            ...funcionario,
            senha: salt,
            });
            res.redirect("/");

        }
       
        });
    } catch(e:any){

      res.render("main/signup", {
        csrf: req.csrfToken(),
        errors: e.errors,
        funcionario,
        departamentos: departamentos.map((d) => d.toJSON()),
      });
    }

  }

}

const createCookie = (req: Request, res: Response)=>{
  if (!req.cookies["nomeCookie"]){
    res.cookie("nomeCookie", "valorCookie");
    res.send("voce nunca passou por aqui");
  }else{
      res.send("voceja passou por aqui");
    }

};



const clearCookie = (req: Request, res: Response)=>{
  res.clearCookie("nomeCookie");
  res.send("Cookie apagado");
  
};

const login = async (req: Request, res: Response) =>{
  if (req.route.methods.get){
    res.render("main/login", {
      csrf: req.csrfToken(),
    });
  }else{
    const {email, senha} = req.body;
    const funcionario = await Funcionarios.findOne({ where: {email}});


    if (funcionario){
      bcrypt.compare(senha, funcionario.senha, (err, ok)=>{
        if (ok){
          req.session.uid = funcionario.id;
          res.redirect("/");
        }else{
          res.render("main/login", {
            csrf: req.csrfToken(),
            email,
            senha,
            senhaIncorreto: true,
    
          });}
    
      });
      res.cookie("logado", true);
      res.redirect("/");
    }else{
      res.render("main/login", {
        csrf: req.csrfToken(),
        email,
        senha,
        incorreto: true,

      });


  
    }
  }

}

const logout = (req: Request, res: Response) =>{

  res.clearCookie("logado");
  res.redirect("/");

}

export default { index, about, ui , createCookie, clearCookie, signup, login, logout};
