import { Module } from '@nestjs/common';
import { ConceptsManualController } from './concepts-manual.controller';
import { ConceptsManualService } from './cencepts-manual.service';

@Module({
  imports: [],
  controllers: [ConceptsManualController],
  providers: [ConceptsManualService],
})
export class ConceptsManualModule {}
