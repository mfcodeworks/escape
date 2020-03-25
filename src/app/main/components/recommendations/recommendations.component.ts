import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../../core/post';
import { DarkThemeService } from '../../../services/dark-theme/dark-theme.service';
import { CacheService } from '../../../services/cache/cache.service';
import { BackendService } from '../../../services/backend/backend.service';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
    fetchedAllrecommendations = false;
    fetchingRecommentdations = false;
    recommendations: Post[] = [];
    isDark: boolean;

    constructor(
        private route: ActivatedRoute,
        private dark: DarkThemeService,
        private cache: CacheService,
        private backend: BackendService
    ) {}

    // TODO: Use BehaivourSubject and shift to async pipe
    // BehaivourSubject -> MergeMap API (offset, limit) -> map local array with concat
    // If fetched < limit, e.target.disabled = true
    ngOnInit() {
        // Get recommendations from route resolver data
        this.route.data.subscribe((data) => {
            if (data.recommendations instanceof Array) {
                this.recommendations = this.shuffle(data.recommendations);
                this.cache.store('recommendations', data.recommendations);
                console.log(this.recommendations);
            } else {
                // Handle error
                console.warn(data);
            }
        });

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }

    fetchMoreRecommendations(e: any): void {
        if (this.fetchedAllrecommendations) {
            e.target.disabled = true;
            return;
        }

        const notIn = this.recommendations.map(r => r.id);

        console.log('Fetching more posts now, excluding id\'s:', notIn);
        this.fetchingRecommentdations = true;

        this.backend.getRecommendations(notIn).subscribe(recommendations => {
            // Set fetched all
            this.fetchedAllrecommendations = !recommendations || !recommendations.length

            // Update posts
            this.recommendations = Array.prototype.concat(this.recommendations, this.shuffle(recommendations));
            this.cache.store('recommendations', this.recommendations);
            console.log(this.recommendations);

            // Set state
            this.fetchingRecommentdations = false;
            e.target.complete();
        }, () => this.fetchingRecommentdations = false);
    }

    shuffle(a: Array<any>): Array<any> {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}
