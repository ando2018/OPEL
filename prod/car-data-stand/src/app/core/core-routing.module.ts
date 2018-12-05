import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRootComponent } from './core-root/core-root.component';

const routes: Routes = [
    {
        path: '',
        component: CoreRootComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
