import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Welcome')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Status Info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All the API Status information will goes here!',
    example: {
      status: HttpStatus.OK,
    },
  })
  getHello(): string {
    return 'Hello, Chan!';
  }
}
