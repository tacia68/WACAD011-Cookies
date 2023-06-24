
//logger.td
import { Request, Response, NextFunction } from 'express';
import { Tipo } from './loggerTypes';

function logger(tipo: Tipo) {
  // const logPath = `${process.cwd()}/log`;

  return (req: Request, res: Response, next: NextFunction) => {
    if (tipo === 'completo') {
      console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    } else {
      console.log(`${new Date().toISOString()} ${req.url}`);
    }
    next();
  };
}


// Renderizar formulário de cadastro de departamento
const create = (req: Request, res: Response) => {
  const csrfToken = req.csrfToken(); // Obter o token CSRF

  // Renderizar o formulário de cadastro de departamento e incluir o token CSRF
  res.render('/dept/create', { csrfToken });
};

export default logger;
