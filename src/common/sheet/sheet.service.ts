import { existsSync } from 'fs';
import { Injectable } from '@nestjs/common';
import xlsx from 'xlsx';

@Injectable()
export class SheetService {
  constructor() {}

  public readCSV(path: string) {
    if (existsSync(path)) {
      const workbook = xlsx.readFile(path, { type: 'file' });
    }
  }
}
