import { ApiProperty } from '@nestjs/swagger';

export class WriteTodoDto {
  @ApiProperty()
  name: string;
}
