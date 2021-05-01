import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private http: HttpService) {
    try {
    } catch (error) {
      throw new Error('Upload processing error occurred.');
    }
  }
}
