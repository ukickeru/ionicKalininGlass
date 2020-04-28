import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
    {path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)},
    {path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)},
    {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)},
    {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
    {path: 'tabs', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)},
    {path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
