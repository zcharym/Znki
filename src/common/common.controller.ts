import {
  Controller,
  Post,
  UploadedFile,
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

@ApiTags('common')
@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly uploadService: UploadService,
  ) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'dts file upload',
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
  public async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const url = await this.uploadService.upload(file);
    return url;
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
