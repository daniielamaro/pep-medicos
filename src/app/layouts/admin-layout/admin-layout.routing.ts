import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { ListarPacientesComponent } from '../../pages/listar-pacientes/listar-pacientes.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',       component: DashboardComponent },
    { path: 'user',            component: UserComponent },
    { path: 'table',           component: TableComponent },
    { path: 'typography',      component: TypographyComponent },
    { path: 'listar-pacientes',component: ListarPacientesComponent },
    { path: 'notifications',   component: NotificationsComponent },
    { path: 'upgrade',         component: UpgradeComponent }
];
