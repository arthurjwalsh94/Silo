import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {}

  async createMedia(ownerId: number, filePath: string) {
    const newMedia = this.mediaRepo.create({ ownerId, filePath });
    return this.mediaRepo.save(newMedia);
  }

  async findAll() {
    // Return an array of all Media records
    return this.mediaRepo.find();
  }

  async findByOwner(ownerId: number) {
    return this.mediaRepo.find({ where: { ownerId } });
  }
}