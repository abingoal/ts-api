import { NextFunction, Request, Response } from "express";
function middlewareA(req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line:no-console
  console.log("加载middlewareA");
  next();
}

export default middlewareA;
