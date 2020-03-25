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

// FIXME: Must enter site from '/' or router takes path '/x' as the root path
// so all tabs become '/x/page'
export const routes: Routes = [
    {
        path: 'app',
        component: BottomBarComponent,
        canActivateChild: [SignedInGuard],
        children: [
            {
                path: 'feed',
                children: [{
                    path: '',
                    component: FeedComponent,
                    resolve: {posts: FeedResolver},
                    // runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'recommendations',
                children:[{
                    path: '',
                    component: RecommendationsComponent,
                    resolve: {recommendations: RecommendationsResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'search',
                children: [{
                    path: '',
                    component: SearchComponent,
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'hashtag/:hashtag',
                children: [{
                    path: '',
                    component: HashtagListingComponent,
                    resolve: {posts: HashtagResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'new-post',
                children: [{
                    path: '',
                    component: NewPostComponent,
                    resolve: {repost: NewPostResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'post/:postId',
                children: [{
                    path: '',
                    component: PostComponent,
                    resolve: {post: PostResolver },
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'notifications',
                children: [{
                    path: '',
                    component: NotificationsComponent,
                    resolve: {notifications: NotificationsResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'profile/:profile',
                children: [{
                    path: '',
                    component: ProfileComponent,
                    resolve: {
                        profile: ProfileResolver,
                        posts: ProfilePostsResolver
                    },
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'profile/:profile/edit',
                children: [{
                    path: '',
                    component: ProfileEditComponent,
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'profile/:profile/following',
                children: [{
                    path: '',
                    component: ProfileListComponent,
                    resolve: {profiles: FollowingResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'profile/:profile/followers',
                children: [{
                    path: '',
                    component: ProfileListComponent,
                    resolve: {profiles: FollowersResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'settings',
                children: [{
                    path: '',
                    component: SettingsComponent,
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'following',
                children: [{
                    path: '',
                    component: ProfileListComponent,
                    resolve: {profiles: FollowingResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'followers',
                children: [{
                    path: '',
                    component: ProfileListComponent,
                    resolve: {profiles: FollowersResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: 'blocked',
                children: [{
                    path: '',
                    component: ProfileListComponent,
                    resolve: {profiles: BlockedProfilesResolver},
                    runGuardsAndResolvers: 'always'
                }]
            },
            {
                path: '',
                redirectTo: '/app/feed',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/feed',
        pathMatch: 'full'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
