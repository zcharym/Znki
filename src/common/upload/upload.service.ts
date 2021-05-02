import { HttpService, Injectable, Logger } from '@nestjs/common';
import { existsSync, unlink } from 'fs';
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
        const result = this.obsService.uploadFile(file);
        const callbackUrl = `${this.obsService.BucketUrl}/${file.originalname}`;
        if (result) {
          await this.db.storage.create({
            data: {
              userId,
              url: callbackUrl,
              key: file.originalname,
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
