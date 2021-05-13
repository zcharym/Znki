import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DIR } from 'src/shared/consts/common.const';
import { ApiFile } from 'src/shared/decorators/swagger-api-file.decorator';
import { CommonService } from './common.service';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { UploadService } from './upload/upload.service';
import { User } from '@prisma/client';
import { AuthUser } from 'src/shared/decorators';
import { JWTGuard } from 'src/modules/auth/jwt.guard';
import { UploadDto } from './upload/upload.dto';

@ApiTags('common')
@Controller('common')
@UseGuards(JWTGuard)
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly uploadService: UploadService,
  ) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'upload file | returning obs url',
    description: 'file upload. Max size is 100MB.',
  })
  @ApiFile()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 100,
      },
      storage: diskStorage({
        destination: DIR.FILE,
        filename: (req, file: Express.Multer.File, cb) => {
          return cb(null, `${nanoid(8)}_${file.originalname}`);
        },
      }),
    }),
  )
  public async upload(
    @UploadedFile('file') file: Express.Multer.File,
    @Query() query: UploadDto,
    @AuthUser() user: User,
  ): Promise<any> {
    const result = await this.uploadService.upload(file, user.id, query.action);
    return result;
  }

  // @Get('download')
  // @ApiOperation({ summary: 'download xlsx file' })
  // public async download(@Res() res: Response): Promise<any> {
  //   // const stream = await this.excelService.exportTemplate(productIdReq.id, session.user);
  //   res.set('Content-Type', 'application/octet-stream');
  //   res.setHeader(
  //     'Content-Disposition',
  //     'attachment; filename=voice_export.xlsx',
  //   );
  //   return ((await stream) as any).pipe(res);
  // }
}
