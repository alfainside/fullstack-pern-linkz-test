import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserNewService } from './userMikro.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('user')
@Controller('api')
export class UserNewGoogleController {
  constructor(private readonly service: UserNewService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const result = await this.service.googleLogin(req, res);
    return {
      data: result,
    };
  }
}
