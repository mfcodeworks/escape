import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../../core/post';
import { CacheService } from '../../../services/cache/cache.service'
import { BackendService } from '../../../services/backend/backend.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
    posts: Post[] = [];
    userId: number;
    fetchedAllPosts = false;
    fetchingPosts = false;

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private backend: BackendService
    ) {}

    // TODO: Use BehaivourSubject and shift to async pipe
    // BehaivourSubject -> MergeMap API (offset, limit) -> map local array with concat
    // If fetched < limit, e.target.disabled = true
    ngOnInit() {
        // Get posts from route resolver data
        this.route.data.subscribe((data) => {
            this.posts = Array.prototype.concat(this.posts, data.posts);
            this.cache.store('feed', data.posts);
        });
    }

    fetchMorePosts(e: any): void {
        if (this.fetchedAllPosts) {
            e.target.disabled = true;
            return;
        }

        this.fetchingPosts = true;

        this.backend.getUserFeed(this.posts[this.posts.length - 1].id).subscribe(posts => {
            // Set fetched all
            this.fetchedAllPosts = posts.length < 30;

            // Update posts
            this.posts = Array.prototype.concat(this.posts, posts);
            this.cache.store('feed', this.posts);

            // Se state
            this.fetchingPosts = false;
            e.target.complete();
        }, () => this.fetchingPosts = false);
    }

    removePost(id: number): void {
        // Remove post from feed array
        this.posts = this.posts.filter((p: Post) => p.id !== id);
    }
}
