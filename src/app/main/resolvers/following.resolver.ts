import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { Profile } from '../core/profile';

@Injectable()
export class FollowingResolver implements Resolve<Profile[]> {

    constructor(
        private user: UserService
    ) { }

    resolve(): Profile[] {
        // TODO: Handle /following and /{{profile}}/following differently
        return this.user.profile.following.map(f => f.followingUser);
    }
}
