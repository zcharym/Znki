import { HttpService, Injectable, Logger } from '@nestjs/common';
import { existsSync, unlink } from 'fs';
import { nanoid } from 'nanoid';
import { ObsService } from 'src/modules/obs/obs.service';
import { DbService } from 'src/shared/db/db.service';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private http: HttpService,
    private obsService: ObsService,
    private db: DbService,
  ) {}

  public async upload(
    file: Express.Multer.File,
    userId: number,
  ): Promise<string> {
    try {
      if (existsSync(file.path)) {
        // obs specific key uuid(8)_filename.ext
        const key = `${nanoid(8)}_${file.originalname}`;
        const callbackUrl = `${this.obsService.BucketUrl}/${key}`;

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
      }
    } catch (error) {
      throw new Error('Upload processing error occurred.');
    } finally {
      await unlink(file.path, err => {
        if (err) {
          throw new Error('unlink file err');
        }
        this.logger.log(`unlink file${file.path} successfully.`);
      });
    }
  }
}
