import { HttpException, HttpStatus } from '@nestjs/common';

export class AlredyExistsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
