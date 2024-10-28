import { Module } from '@nestjs/common';
import { ConceptsAutoController } from './concepts-auto.controller';

@Module({
  controllers: [ConceptsAutoController],
})
export class ConceptsAutoModule {}
