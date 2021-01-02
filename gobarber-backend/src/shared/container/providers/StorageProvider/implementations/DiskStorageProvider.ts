import fs from 'fs';
import path from 'path';
import uploaConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string>{
    await fs.promises.rename(
      path.resolve(uploaConfig.tmpFolder, file),
      path.resolve(uploaConfig.uploadsFolder, file),
    );
    return file;
  };

  public async deleteFile(file: string): Promise<void>{
    const filePath = path.resolve(uploaConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    }catch {
      return;
    }
    await fs.promises.unlink(filePath);
  };
}