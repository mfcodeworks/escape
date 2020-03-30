import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'tag'
})
export class TagPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {}

    transform(value: any, ...args: any[]): any {
        value = value.replace(/\B(\#[a-zA-Z\-\_]+\b)/g, (tag: string) => {
            return `<a href="/app/hashtag/${tag.substr(1, tag.length)}">${tag}</a>`;
        });
        value = value.replace(/\B(\@[a-zA-Z\-\_]+\b)/g, (tag: string) => {
            return `<a href="/app/profile/${tag.substr(1, tag.length)}">${tag}</a>`;
        });
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }

}
