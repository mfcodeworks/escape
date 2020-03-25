import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../../../services/cache/cache.service';
import { BackendService } from '../../../services/backend/backend.service';

@Component({
    selector: 'app-hashtag-listing',
    templateUrl: './hashtag-listing.component.html',
    styleUrls: ['./hashtag-listing.component.css']
})
export class HashtagListingComponent implements OnInit {
    isDark: boolean;
    hashtag: string;
    posts: any = [];
    fetchedAll = false;
    fetchingLists = false;

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private backend: BackendService
    ) { }

    // TODO: Use BehaivourSubject and shift to async pipe
    // BehaivourSubject -> MergeMap API (offset, limit) -> map local array with concat
    // If fetched < limit, e.target.disabled = true
    ngOnInit() {
        // Get current hashtag
        this.route.paramMap.subscribe(map => {
            this.hashtag = map.get('hashtag');
        });

        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            this.posts = data.posts;
            this.cache.store(`hashtag-${this.hashtag}`, data.posts);
            console.log(this.posts);
        });
    }

    fetchMoreResults(e: any): void {
        if (this.fetchedAll) {
            e.target.disabled = true;
            return;
        }

        // Exclude posts that are already fetched
        const topNotIn = this.posts.top.map(r => r.id);
        const recentNotIn = this.posts.recent.map(r => r.id);

        this.fetchingLists = true;

        // Get more posts
        console.log('Fetching more posts now, excluding id\'s:', Array.prototype.concat(topNotIn, recentNotIn));
        this.backend.search(this.hashtag, 'hashtag', topNotIn, recentNotIn).subscribe((results: any) => {
            // Set fetched all
            this.fetchedAll = !results.top.length && !results.recent.length;

            // Update posts
            this.posts.top = Array.prototype.concat(this.posts.top, results.top);
            this.posts.recent = Array.prototype.concat(this.posts.recent, results.recent);
            this.cache.store(`hashtag-${this.hashtag}`, this.posts);
            console.log(this.posts);

            // Set state
            this.fetchingLists = false;
            e.target.complete();
        }, () => this.fetchingLists = false);
    }
}
