import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { UsernameComponent } from './components/username/username.component';

export const routes: Routes = [
    {path:"chat",component:ChatComponent},
    {path:"UserName",component:UsernameComponent}
];
