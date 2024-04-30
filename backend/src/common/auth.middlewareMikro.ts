import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserNewService } from 'src/userMIkro/userMikro.service';

@Injectable()
export class AuthMiddlewareMikro implements NestMiddleware {
  constructor(private readonly userService: UserNewService) {}
  async use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const secretkey = process.env.SECRET_KEY;
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, secretkey);
      const user = await this.userService.getUser(decoded.username);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      req.user.id = decoded.id;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
