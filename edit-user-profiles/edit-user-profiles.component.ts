import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../nb-user.service';

import { editUserProfilesPopupOptions } from '../../nb-config';
import { User } from '../user';


@Component({
    selector:'nb-edit-user-profiles',
    templateUrl: './edit-user-profiles.component.html'
})
export class NbEditUserProfilesComponent implements OnInit, OnDestroy {

    public popupOptions = editUserProfilesPopupOptions;
    public loggedUser: User;

    private _subscriptions: Subscription[] = [];
 
    private _userService: UserService;

    constructor(userService: UserService){
        this._userService = userService;
    }

    ngOnInit(){
        this.setUserProfiles();
    
    }

    setUserProfiles(): void{
        this._subscriptions.push(
            this._userService.getLoggedUser()
                .subscribe((loggedUser: any) =>{

                    this.loggedUser = JSON.parse(JSON.stringify(loggedUser));

                    for(let key in loggedUser.profilesDetails){
                        this.loggedUser.profilesDetails[key] = loggedUser.profilesDetails[key];
                    }

                })
        )
    }

    onDeleteProfile(profileId): void{

        delete this.loggedUser.profilesDetails[profileId];

        const index = this.loggedUser.profiles.findIndex(pos => pos.id === profileId);
        this.loggedUser.profiles.splice(index,1);

    }

    onChangeColor(event, profileId): void{
        const index = this.loggedUser.profiles.findIndex(pos => pos.id === profileId);

        this.loggedUser.profiles[index].color = event.target.value;
    }

    doSave(): void{
        this._userService.saveLoggedUserChanges(this.loggedUser)
        this.closePopup();
    }

    doCancel(): void{
        this.closePopup();
    }

    closePopup(): void{
        this._userService.closePopup('editUserProfilesPopupOptions')//TODO que se carge de popupconfig a traves de userservice
    }

    ngOnDestroy(): void{
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
}