import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NbUserService, NbPopupsService } from '../nb-services';

import { User } from './user';

@Injectable()
export class UserService{

    private _nbUserService: NbUserService;
    private _nbPopupsService: NbPopupsService;

    constructor(nbUserService: NbUserService, nbPopupsService: NbPopupsService){
        this._nbUserService = nbUserService;
        this._nbPopupsService = nbPopupsService;
    }

    getLoggedUser(): Observable<User>{
        return this._nbUserService.getLoggedUser();
    }

    closePopup(popup): void{
        this._nbPopupsService.closePopupp(popup);
    }

    saveLoggedUserChanges(loggedUser: User): void{
        this._nbUserService.saveLoggedUserChanges(loggedUser);
    }

}