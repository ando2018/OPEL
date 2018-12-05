import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarInfosRootComponent } from './car-infos-root/car-infos-root.component';
import { EquipmentsComponent } from './equipments/equipments.component';

const routes: Routes = [
    {
        path: 'car-infos',
        component: CarInfosRootComponent,
        children: [
            {path: '', redirectTo: 'equipments', pathMatch: 'full'},
            {path: 'equipments', component: EquipmentsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarInfosRoutingModule {
}
