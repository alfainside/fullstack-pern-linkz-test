import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserNewService } from './userMikro.service';
import { UpdateUserDto, registerUserNew, userLogin } from './userMikro.field';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/auth.decoratormikro';

@ApiBearerAuth()
@ApiTags('user')
@Controller('api/users')
export class UserNewController {
  constructor(private readonly service: UserNewService) {}

  @Get()
  async lists(@Res() res: Response): Promise<Response> {
    return res.status(200).json(await this.service.lists());
  }

  @Post('register')
  async register(@Body() body: registerUserNew) {
    return this.service.register(body);
  }

  @Post('login')
  async login(@Body() body: userLogin): Promise<any> {
    return this.service.login(body);
  }

  @Get('current/:param')
  async getUser(
    @User('username') username: string,
    @Param('param') param,
    @Res() res: Response,
  ) {
    return res.status(200).json(await this.service.getUser(param));
  }

  @Get('current')
  async findMe(@User('username') username: string): Promise<any> {
    return this.service.findByUsername(username);
  }

  @Put('current')
  async update(@User('id') id: string, @Body() userData: UpdateUserDto) {
    return this.service.update(id, userData);
  }
}
