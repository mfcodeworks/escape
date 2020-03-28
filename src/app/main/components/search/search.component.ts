import { Component, AfterViewInit , ViewChild } from '@angular/core';

import { Profile } from '../../core/profile';
import { BackendService } from '../../../services/backend/backend.service';
import { CacheService } from '../../../services/cache/cache.service';
import { IonSearchbar } from '@ionic/angular';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit  {
    @ViewChild('searchInput', { static: false }) searchInput: IonSearchbar;
    profiles: Profile[] = [];
    hashtags: Array<any> = [];
    loading = false;
    isDark: boolean;

    constructor(
        private backend: BackendService,
        private cache: CacheService
    ) {}

    ngAfterViewInit() {
        // Set search focus
        this.searchInput.setFocus();
    }

    doSearch(ev: CustomEvent): void {
        // Set new search
        console.log('New search', ev);
        const search = ev.detail.value;

        // Filter search
        if (search.length < 2) {
            return;
        }

        // Set query as loading
        this.loading = true;

        // // Get profile results
        this.backend.search(search).subscribe(
            (result: any) => {
                this.cache.store(`search-${search}`, result);

                // Reference results
                this.profiles = result.users;

                // Order hashtags as shortest (closest match) first
                this.hashtags = result.hashtags.sort((a: any, b: any) => a.localeCompare(b));
                console.log(result);

                // Set loading complete
                this.loading = false;
            }, (error: any) => console.warn(error)
        );
    }
}
