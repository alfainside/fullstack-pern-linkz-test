import { HttpException, Injectable } from '@nestjs/common';
import { UserNewInstance, user } from './userMikro.entity';
import { MikroORM, wrap } from '@mikro-orm/core';
import { UpdateUserDto, registerUserNew, userLogin } from './userMikro.field';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class UserNewService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  public async lists() {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    const result = orm.findAll();
    return {
      success: true,
      message: 'list users',
      data: result,
    };
  }

  public async register(body: registerUserNew) {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    body.password = await bcrypt.hash(body.password, 10);
    const create = orm.create({ ...body });
    await this.orm.em.persistAndFlush(create);
    return {
      success: true,
      message: 'register success',
      data: create,
    };
  }

  public async login(body: userLogin) {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    const usrName = body.username;
    const getUser = await orm.findOneOrFail({ username: usrName });

    if (!getUser) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      getUser.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const tokenJwt = await this.generateJWT({
      username: getUser.username,
      name: getUser.name,
      id: getUser.id,
    });

    this.orm.em.assign(getUser, {
      token: tokenJwt,
    });

    await this.orm.em.flush();

    return {
      success: true,
      message: 'Register success',
      data: {
        username: getUser.username,
        id: getUser.id,
        token: getUser.token,
      },
      token: getUser.token,
    };
  }

  async googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);

    const userFind = await orm.findOne({
      username: req.user.email,
    });
    const paramCreate = {
      username: req.user.email,
      name: req.user.firstName,
      email: req.user.email,
      password: '',
    };

    if (!userFind) {
      // if user no exist create by google account
      const create = orm.create({ ...paramCreate });
      await this.orm.em.persistAndFlush(create);
    }

    //find againt user by email
    const userFindByEmail = await orm.findOneOrFail({
      username: req.user.email,
    });
    const tokenJwt = await this.generateJWT({
      username: userFindByEmail.username,
      name: userFindByEmail.name,
      id: userFindByEmail.id,
    });
    userFindByEmail.token = tokenJwt;
    const paramUpdate = {
      token: tokenJwt,
    };
    wrap(userFindByEmail).assign(paramUpdate);
    await this.orm.em.flush();

    return res.redirect(
      `http://localhost:3000/login?token=${tokenJwt}&username=${req.user.email}&name=${req.user.firstName}`,
    );
  }

  public async getUser(param) {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    const result = await orm.findOneOrFail({ username: param });
    return result;
  }

  async findByUsername(username: string): Promise<any> {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    const userRes = await orm.findOneOrFail({ username });
    return {
      success: true,
      message: 'success find user',
      data: userRes,
    };
  }

  async update(id: string, dto: UpdateUserDto) {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    const users = await orm.findOneOrFail(id);

    wrap(users).assign(dto);
    await this.orm.em.flush();
    return {
      success: true,
      message: 'success update user',
      data: users,
    };
  }

  async delete(username: string) {
    const orm = await this.orm.em.getRepository<UserNewInstance>(user);
    const res = await orm.nativeDelete({ username });
    return {
      success: true,
      message: 'success delete user',
      data: res,
    };
  }

  async generateJWT(param) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    const secretkey = process.env.SECRET_KEY;
    return jwt.sign(
      {
        name: param.name,
        exp: exp.getTime() / 1000,
        id: param.id,
        username: param.username,
      },
      secretkey,
    );
  }
}
