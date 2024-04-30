import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }

  const token = req.headers?.authorization
    ? (req.headers.authorization as string).split(' ')
    : null;
  const secretkey = process.env.SECRET_KEY;

  if (token?.[1]) {
    const decoded: any = jwt.verify(token[1], secretkey);
    return !!data ? decoded[data] : decoded.user;
  }
});
