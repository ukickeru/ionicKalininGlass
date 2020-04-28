import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/call',
                pathMatch: 'full'
            },
            {
                path: 'call',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./call/call.module').then(m => m.CallPageModule)
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarPageModule)
                    }
                ]
            }
        ]
    },
    // {
    //     path: '',
    //     redirectTo: 'tabs/call',
    //     pathMatch: 'full'
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
