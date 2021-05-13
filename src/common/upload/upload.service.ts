import { HttpService, Injectable } from '@nestjs/common';
import { existsSync, unlink } from 'fs';
import { nanoid } from 'nanoid';
import { Logger } from 'nestjs-pino';
import { ObsService } from 'src/modules/obs/obs.service';
import { UploadTypeENum } from 'src/shared/consts/common.const';
import { DbService } from 'src/shared/db/db.service';
import { AppException } from 'src/shared/exceptions/app.exception';
import { SheetService } from '../sheet/sheet.service';

@Injectable()
export class UploadService {
  constructor(
    private http: HttpService,
    private obsService: ObsService,
    private sheetService: SheetService,
    private db: DbService,
    private logger: Logger,
  ) {}

  public async upload(
    file: Express.Multer.File,
    userId: number,
    type: UploadTypeENum,
  ): Promise<string> {
    try {
      if (file && existsSync(file.path)) {
        // obs specific key uuid(8)_filename.ext
        const key = `${nanoid(8)}_${file.originalname}`;
        const callbackUrl = `${this.obsService.BucketUrl}/${key}`;

        if (type === UploadTypeENum.USER_CONTENT) {
          // case: file append with card content
          const result = this.obsService.uploadFile({ key, ...file });
          if (result) {
            await this.db.storage.create({
              data: {
                userId,
                url: callbackUrl,
                key,
                mimeType: file.mimetype,
              },
            });
          }
          return callbackUrl;
        } else if (type === UploadTypeENum.FORMATTED_CARD) {
          // case: multiple formatted card upload with csv.
          await this.sheetService.readCSV(file.path);
        } else if (type === UploadTypeENum.TEMP) {
          return 'temp file uploaded';
        } else {
          return 'not implemented yet.';
        }
      }
    } catch (error) {
      throw new AppException('Upload processing error occurred.');
    } finally {
      if (file) {
        await unlink(file.path, err => {
          if (err) {
            throw new Error('unlink file err');
          }
          this.logger.log(`unlink file${file.path} successfully.`);
        });
      }
    }
  }
}
