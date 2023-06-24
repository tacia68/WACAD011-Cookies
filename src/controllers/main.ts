//controller/main.ts

import { NextFunction, Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.render('main/index');
};

const about = (req: Request, res: Response) => {
  res.render('main/about');
};

const ui = (req: Request, res: Response) => {
  res.render('main/ui');
};

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

const login = (req: Request, res: Response) =>{
  if (req.route.methods.get){
    res.render("main/login", {
      csrf: req.csrfToken(),
    });
  }else{
    const {username, senha} = req.body;
    if (username === "user" && senha === "12345"){
      res.cookie("logado", true);
      res.redirect("/");
    }else{
      res.render("main/login", {
        csrf: req.csrfToken(),
        username,
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

export default { index, about, ui , createCookie, clearCookie, login, logout};
