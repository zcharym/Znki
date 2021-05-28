import {
  HttpService,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ObsClient = require('esdk-obs-nodejs');
import { createReadStream } from 'fs';
import { IObsMessage } from './obs.interface';

/**
 *
 * 华为云OBS
 * @description 对象链接地址格式为：https://桶名.域名/文件夹目录层级/对象名。
 */
@Injectable()
export class ObsService implements OnModuleInit, OnModuleDestroy {
  private obsClient: any;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  onModuleInit() {
    this.initClient();
  }

  get BucketUrl(): string {
    return this.configService.get<string>('BUCKET_URL');
  }

  public initClient() {
    const clientInfo = {
      access_key_id: this.configService.get<string>('ACCESS_KEY_ID'),
      secret_access_key: this.configService.get<string>('SECRET_ACCESS_KEY'),
      server: this.configService.get<string>('OSS_SERVER'),
    };
    if (
      !clientInfo.access_key_id ||
      !clientInfo.secret_access_key ||
      !clientInfo.server
    ) {
      throw new Error(
        "can't read obs config file from .env file, please check again.",
      );
    }

    this.obsClient = new ObsClient(clientInfo);
    this.obsClient.initLog({
      file_full_path: './logs/OBS-SDK.log', // 配置日志文件路径
      max_log_size: 20480, // 配置日志文件大小，单位：字节
      backups: 10, // 配置最大可保留的日志文件个数
      level: 'warn', // 配置日志级别
      log_to_console: true, // 配置是否将日志打印到console
    });
  }

  public async test() {
    const bucket = await this.obsClient.headBucket({ Bucket: 'znki' });
    console.log(bucket.CommonMsg.Status);
    return Promise.resolve('success');
  }

  onModuleDestroy() {
    this.obsClient.onClose();
  }

  /**
   * upload stream with tmp file
   * @param file MulterFile
   * @returns file url
   * @version 0.1
   */
  public async uploadFile(
    file: Express.Multer.File & { key: string },
  ): Promise<IObsMessage> {
    try {
      return this.obsClient.putObject({
        Bucket: 'znki',
        Key: file.key,
        Body: createReadStream(file.path),
      });
    } catch (error) {
      console.error('Error-->' + error);
    }
  }

  private async createDirectory() {}

  // 下载对象
  public async downloadFile() {
    // this.obsClient.getObject(
    //   { Bucket: 'bucketname', Key: 'objectname' },
    //   (err, result) => {
    //     if (err) {
    //       console.error('Error-->' + err);
    //     } else {
    //       console.log('Status-->' + result.CommonMsg.Status);
    //       if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
    //         console.log(result.InterfaceResult.Content.toString());
    //       }
    //     }
    //   },
    // );
  }
  // 列举对象
  /**
   * 查看桶中包含哪些对象
   *
   */
  public async listFiles() {
    // this.obsClient.listObjects({ Bucket: 'bucketname' }, (err, result) => {
    //   if (err) {
    //     console.error('Error-->' + err);
    //   } else {
    //     console.log('Status-->' + result.CommonMsg.Status);
    //     if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
    //       for (let i = 0; i < result.InterfaceResult.Contents.length; i++) {
    //         console.log('Contents[' + i + ']:');
    //         console.log('Key-->' + result.InterfaceResult.Contents[i]['Key']);
    //         console.log(
    //           'LastModified-->' +
    //             result.InterfaceResult.Contents[i]['LastModified'],
    //         );
    //         console.log('Size-->' + result.InterfaceResult.Contents[i]['Size']);
    //       }
    //     }
    //   }
    // });
  }
  // 删除对象
  public async deleteFile() {
    //   this.obsClient.deleteObject(
    //     { Bucket: 'bucketname', Key: 'objectname' },
    //     (err, result) => {
    //       if (err) {
    //         console.error('Error-->' + err);
    //       } else {
    //         console.log('Status-->' + result.CommonMsg.Status);
    //       }
    //     },
    //   );
  }
}
