import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { JsNgTranslatorModule, JsNgPopupModule, JsNgBasicModule } from '../@js-lib';

import { NbEditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { NbEditUserProfilesComponent } from './edit-user-profiles/edit-user-profiles.component';

import { UserService } from './nb-user.service';


@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        JsNgTranslatorModule,
        JsNgPopupModule,
        JsNgBasicModule
    ],
    declarations:[ NbEditUserInfoComponent, NbEditUserProfilesComponent ],
    exports:[ NbEditUserInfoComponent, NbEditUserProfilesComponent ],
    providers: [UserService]
})
export class NbUserModule{

}