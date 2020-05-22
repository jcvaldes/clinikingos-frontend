import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { MaterialModule } from '../shared/material.module';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { GraficoLineaComponent } from './grafico-linea/grafico-linea.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  declarations: [
    ModalUploadComponent,
    GraficoDonaComponent,
    GraficoLineaComponent,
  ],
  exports: [
    ModalUploadComponent,
    GraficoDonaComponent,
    GraficoLineaComponent,
  ],
  providers: [
  ],
  entryComponents: []
 
})
export class ComponentsModule {}
