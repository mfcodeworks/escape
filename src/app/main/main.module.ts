import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MentionModule } from 'angular-mentions';
import { IonicModule } from '@ionic/angular';

import { Routing } from './main.routing';
import { MaterialModule } from '../material/material.module';
import { FeedResolver } from './resolvers/feed.resolver';
import { RecommendationsResolver } from './resolvers/recommendations.resolver';
import { NotificationsResolver } from './resolvers/notifications.resolver';
import { HashtagResolver } from './resolvers/hashtag.resolver';
import { ProfileResolver } from './resolvers/profile.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { NewPostResolver } from './resolvers/new-post.resolver';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { PostDisplayComponent } from './components/post/post-view/post-display/post-display.component';
import { PostPreviewGridComponent } from './components/post-preview-grid/post-preview-grid.component';
import { PostInteractionBarComponent } from './components/post/post-view/post-interaction-bar/post-interaction-bar.component';
import { PostCommentsComponent, CommentDialogComponent } from './components/post/post-view/comments/comments.component';
import { FeedComponent } from './components/feed/feed.component';
import { NewPostComponent, PostBottomSheetComponent } from './components/new-post/new-post.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PostComponent } from './components/post/post.component';
import { PostViewComponent } from './components/post/post-view/post-view.component';
import { ProfileComponent, ProfileDialogComponent } from './components/profile/profile.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DateDiffPipe } from './pipes/date-diff.pipe';
import { SearchComponent } from './components/search/search.component';
import { HashtagListingComponent } from './components/hashtag-listing/hashtag-listing.component';
import { RouteTransformerDirective } from '../shared/directives/route-transformer.directive';
import { TagPipe } from './pipes/tag.pipe';
import { PostLikesComponent } from './components/post/post-view/post-likes/post-likes.component';
import { ProfileDisplayComponent } from './components/profile/profile-display/profile-display.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { LongholdDirective } from '../shared/directives/longhold.directive';
import { ProfileListComponent, BlockedDialogComponent } from './components/profile-list/profile-list.component';
import { FollowersResolver } from './resolvers/followers.resolver';
import { FollowingResolver } from './resolvers/following.resolver';
import { BlockedProfilesResolver } from './resolvers/blocked-profiles.resolver';
import { ProfilePostsResolver } from './resolvers/profile-posts.resolver';
import { FloatingHeartComponent } from './components/floating-heart/floating-heart.component';

@NgModule({
    imports: [
        IonicModule,
        MaterialModule,
        CommonModule,
        // MentionModule,
        // OverlayModule,
        ReactiveFormsModule,
        Routing
    ],
    declarations: [
        TopBarComponent,
        BottomBarComponent,
        PostDisplayComponent,
        PostPreviewGridComponent,
        PostInteractionBarComponent,
        CommentDialogComponent,
        BlockedDialogComponent,
        ProfileDialogComponent,
        PostCommentsComponent,
        FeedComponent,
        PostBottomSheetComponent,
        NewPostComponent,
        NotificationsComponent,
        PostComponent,
        ProfileComponent,
        RecommendationsComponent,
        SettingsComponent,
        DateDiffPipe,
        SearchComponent,
        PostViewComponent,
        HashtagListingComponent,
        RouteTransformerDirective,
        TagPipe,
        PostLikesComponent,
        ProfileDisplayComponent,
        ProfileEditComponent,
        LongholdDirective,
        ProfileListComponent,
        FloatingHeartComponent
    ],
    entryComponents: [
        CommentDialogComponent,
        ProfileDialogComponent,
        PostBottomSheetComponent,
        BlockedDialogComponent,
        FloatingHeartComponent
    ],
    providers: [
        FeedResolver,
        RecommendationsResolver,
        NotificationsResolver,
        ProfileResolver,
        PostResolver,
        HashtagResolver,
        NewPostResolver,
        FollowersResolver,
        FollowingResolver,
        BlockedProfilesResolver,
        ProfilePostsResolver
    ],
    exports: [
        TopBarComponent,
        BottomBarComponent,
        PostDisplayComponent,
        PostPreviewGridComponent,
        PostInteractionBarComponent,
        CommentDialogComponent,
        ProfileDialogComponent,
        PostCommentsComponent,
        FeedComponent,
        PostBottomSheetComponent,
        BlockedDialogComponent,
        NewPostComponent,
        NotificationsComponent,
        PostComponent,
        ProfileComponent,
        RecommendationsComponent,
        SettingsComponent,
        DateDiffPipe,
        SearchComponent,
        PostViewComponent,
        HashtagListingComponent,
        RouteTransformerDirective,
        TagPipe,
        PostLikesComponent,
        ProfileDisplayComponent,
        ProfileEditComponent
    ]
})
export class MainModule { }
