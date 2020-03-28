import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, ExtraOptions } from '@angular/router';
import { SignedInGuard } from './shared/guards/signed-in.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [SignedInGuard],
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },
    {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    }
    // {
    //     path: '**',
    //     component: NotFound404Component
    // }
];

const options: ExtraOptions = {
    preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
