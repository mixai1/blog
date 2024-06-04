import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import dayjs from 'dayjs';

import { PostTypeEnum } from '@shared/enums/post-type.enum';

import { AddPostInterface } from '@models/form-interfaces/add-post.interface';
import { PostModel } from '@models/post.model';

import { AddPost } from 'src/app/blog/store/blog.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-post',
    templateUrl: 'add-post.component.html'
})
export class AddPostComponent {
    form = this.createForm();

    readonly postTypeOptions = [
        PostTypeEnum.Ad,
        PostTypeEnum.Mem,
        PostTypeEnum.Post,
        PostTypeEnum.None
    ];

    readonly postTypes: { [key: number]: string } = {
        [PostTypeEnum.Ad]: 'Add',
        [PostTypeEnum.Post]: 'Post',
        [PostTypeEnum.Mem]: 'Mem',
        [PostTypeEnum.None]: 'None',
    };

    constructor(private fb: FormBuilder, private store: Store) { }

    private createForm(): FormGroup<AddPostInterface> {
        return this.fb.nonNullable.group({
            body: ['', Validators.required],
            photo: ['', Validators.required],
            header: ['', Validators.required],
            type: [PostTypeEnum.Post, Validators.required],
            createTime: dayjs(dayjs()).unix()
        });
    }

    public onAddPost(): void {
        if (this.form.invalid) {
            return;
        }

        const post = this.form.getRawValue();
        this.store.dispatch(new AddPost(new PostModel(post)));
    }
}
