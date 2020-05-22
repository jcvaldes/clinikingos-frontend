import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyTokenGuard, LoginGuard } from '../../../services/service.index';
import { ContractsComponent } from './contracts.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractListResolverGuard } from './contract-list/contract-list-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Contratos' },
    children: [
      {path: '', component: ContractListComponent,  runGuardsAndResolvers: 'always', resolve: { contracts: ContractListResolverGuard }},
      {path: 'new', component: ContractDetailComponent },
      {path: ':id', component: ContractDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ContractsRoutingModule { }
