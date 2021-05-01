import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private http: HttpService) {}
}
