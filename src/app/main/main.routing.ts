import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {SignedInGuard} from '../shared/guards/signed-in.guard';
import {FeedResolver} from './resolvers/feed.resolver';
import {RecommendationsResolver} from './resolvers/recommendations.resolver';
import {HashtagResolver} from './resolvers/hashtag.resolver';
import {NotificationsResolver} from './resolvers/notifications.resolver';
import {ProfileResolver} from './resolvers/profile.resolver';
import {PostResolver} from './resolvers/post.resolver';
import {NewPostResolver} from './resolvers/new-post.resolver';
import {FeedComponent} from './components/feed/feed.component';
import {NewPostComponent} from './components/new-post/new-post.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PostComponent} from './components/post/post.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileEditComponent} from './components/profile/profile-edit/profile-edit.component';
import {RecommendationsComponent} from './components/recommendations/recommendations.component';
import {SettingsComponent} from './components/settings/settings.component';
import {SearchComponent} from './components/search/search.component';
import {HashtagListingComponent} from './components/hashtag-listing/hashtag-listing.component';
import {ProfileListComponent} from './components/profile-list/profile-list.component';
import {FollowersResolver} from './resolvers/followers.resolver';
import {FollowingResolver} from './resolvers/following.resolver';
import {BlockedProfilesResolver} from './resolvers/blocked-profiles.resolver';
import {ProfilePostsResolver} from './resolvers/profile-posts.resolver';
import {BottomBarComponent} from './components/bottom-bar/bottom-bar.component';

export const routes: Routes = [
    {
        path: '',
        component: BottomBarComponent,
        canActivateChild: [SignedInGuard],
        children: [
            {
                path: 'feed',
                component: FeedComponent,
                resolve: {posts: FeedResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'recommendations',
                component: RecommendationsComponent,
                resolve: {recommendations: RecommendationsResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'search',
                component: SearchComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'hashtag/:hashtag',
                component: HashtagListingComponent,
                resolve: {posts: HashtagResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'new-post',
                component: NewPostComponent,
                resolve: {repost: NewPostResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'post/:postId',
                component: PostComponent,
                resolve: {post: PostResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                resolve: {notifications: NotificationsResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile',
                component: ProfileComponent,
                resolve: {
                    profile: ProfileResolver,
                    posts: ProfilePostsResolver
                },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile/edit',
                component: ProfileEditComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile/following',
                component: ProfileListComponent,
                resolve: {profiles: FollowingResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile/followers',
                component: ProfileListComponent,
                resolve: {profiles: FollowersResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'settings',
                component: SettingsComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'following',
                component: ProfileListComponent,
                resolve: {profiles: FollowingResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'followers',
                component: ProfileListComponent,
                resolve: {profiles: FollowersResolver},
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'blocked',
                component: ProfileListComponent,
                resolve: {profiles: BlockedProfilesResolver},
                runGuardsAndResolvers: 'always'
            }
        ]
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
