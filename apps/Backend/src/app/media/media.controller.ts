import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt')) // Only logged-in (JWT) users can upload
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        // Create a unique filename (timestamp + original name)
        const filename = Date.now() + '-' + file.originalname;
        callback(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Build filePath for local storage
    const filePath = `/uploads/${file.filename}`;

    // Save a record to the DB linking the file to the uploader
    // (req.user is set by the JWT guard and typically has userId, username, etc.)
    const newMedia = await this.mediaService.createMedia(req.user.userId, filePath);

    // Return success plus the new DB record info
    return {
      success: true,
      filePath: newMedia.filePath,
      id: newMedia.id,
    };
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt')) // Only logged-in users can list media
  async listAll() {
    // Fetches all records in the Media table
    return this.mediaService.findAll();
  }
}