import { Component, Input } from '@angular/core';
import { Post } from '../../../../core/post';
import { Profile } from '../../../../core/profile';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-post-options',
    templateUrl: './post-options.component.html',
    styleUrls: ['./post-options.component.scss'],
})
export class PostOptionsComponent {
    @Input('post') post: Post;
    @Input('user') user: Profile;

    constructor(private modals: PopoverController) {}

    deletePost(): void {
        this.modals.dismiss('delete');
    }

    reportPost(): void {
        this.modals.dismiss('report');
    }

    copyURL(): void {
        this.modals.dismiss('copy');
    }
}
