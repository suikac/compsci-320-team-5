import { IsNumberString, IsOptional } from 'class-validator';

/**
 * Describe the basic get dto
 */
export class BasicGetDto {

  static DEFAULT_PAGE = '1'

  static DEFAULT_LIMIT = '10'

  @IsNumberString()
  @IsOptional()
  page?: string

  @IsNumberString()
  @IsOptional()
  limit?: string

}
