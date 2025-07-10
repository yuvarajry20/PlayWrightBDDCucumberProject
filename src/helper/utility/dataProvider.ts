import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export interface RegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender?: string;
}

export class DataProvider {
  static getRegisterUsersFromCSV(): RegisterUser[] {
    const filePath = path.resolve(__dirname, './test-data/registerUsers.csv');

    // ✅ Read file and strip BOM if present
    let fileContent = fs.readFileSync(filePath, 'utf-8');
    fileContent = fileContent.replace(/^\uFEFF/, ''); // Handle BOM

    // ✅ Parse CSV content into records
    const records: RegisterUser[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // ✅ Optional debug log
    console.log('Parsed CSV records:', records);

    return records;
  }
}
