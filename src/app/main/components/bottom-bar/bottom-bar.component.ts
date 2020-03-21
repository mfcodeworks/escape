import { Component } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent {
    username: string;
    activeNav: string;

    constructor(private user: UserService) {
        // Set username
        this.username = this.user.profile.username;
    }
}
