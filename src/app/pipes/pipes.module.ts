import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { SpacePipe } from './space';

@NgModule({
  imports: [],
  declarations: [ImagePipe, SpacePipe],
  exports: [
    ImagePipe,
    SpacePipe,
  ]
})
export class PipesModule { }
