import { ApiProperty } from '@nestjs/swagger';
export class authDto {
 
  @ApiProperty({ example: 'Altynai', description: 'name' })
  username: string;

  @ApiProperty({ example: 'djfhbvdf3832b', description: 'pwd' })
  password: string;
}
