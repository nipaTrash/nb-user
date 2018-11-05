import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NbUserService } from '../../nb-services';

import { nbLangs } from '../../nb-config';

import { NbUser } from '../../nb-models'


@Component({
    selector: 'edit-user-info',
    templateUrl: './edit-user-info.component.html'
})
export class NbEditUserInfoComponent implements OnInit{

    private _fb: FormBuilder;
    private userInfoForm: FormGroup;

    private _nbUserService: NbUserService;

    constructor (fb:FormBuilder, nbUserService: NbUserService){
        this._fb = fb;
        this._nbUserService = nbUserService;
    }

    langs = nbLangs;

    user: NbUser;

    ngOnInit(){
        this.setUser();
        this.user = this._nbUserService.loggedUser;
    }

    setUser(): void{
        this._nbUserService.getLoggedUser().subscribe((user:NbUser) => {
            this.user = user;
            this.createUserInfoForm();
        })
    }
    createUserInfoForm(): void{
        this.userInfoForm =  new FormGroup({
            'firstName': new FormControl(this.user.firstName, [Validators.required]),
            'lastName': new FormControl(this.user.lastName),
            'email': new FormControl(this.user.email, [Validators.email, Validators.required]),
            'lang': new FormControl(this.user.lang)
        })

        this.userInfoForm.valueChanges.subscribe(value => {
            this.user.firstName = value.firstName;
            this.user.lastName = value.lastName;
            this.user.email = value.email;
            this.user.lang = value.lang;
        })
    }
    onUpdate(): void{
        const firstName = this.userInfoForm.get('firstName').value;
        const lastName = this.userInfoForm.get('lastName').value;
    }
}