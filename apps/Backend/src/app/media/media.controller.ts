import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UseGuards,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { AuthGuard } from '@nestjs/passport';
  
  @Controller('media')
  export class MediaController {
    @Post('upload')
    @UseGuards(AuthGuard('jwt')) // JWT-protected
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = Date.now() + '-' + file.originalname;
          callback(null, filename);
        },
      }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      // Return the path or a message
      return {
        success: true,
        filePath: `/uploads/${file.filename}`,
      };
    }
  }