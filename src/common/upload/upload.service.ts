import { HttpService, Injectable, Logger } from '@nestjs/common';
import { existsSync, unlink } from 'fs';
import { ObsService } from 'src/modules/obs/obs.service';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(private http: HttpService, private obsService: ObsService) {}

  public async upload(file: Express.Multer.File) {
    try {
      if (existsSync(file.path)) {
        return this.obsService.uploadFile(file);
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
