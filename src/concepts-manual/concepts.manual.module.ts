import { Module } from '@nestjs/common';
import { ConceptsManualController } from './concepts-manual.controller';

@Module({
  imports: [],
  controllers: [ConceptsManualController],
  providers: [],
})
export class ConceptsManualModule {}
