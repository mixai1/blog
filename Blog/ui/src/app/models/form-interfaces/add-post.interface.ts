import { FormControl } from '@angular/forms';

import { PostTypeEnum } from '@shared/enums/post-type.enum';

export interface AddPostInterface {
    photo: FormControl<string>;
    header: FormControl<string>;
    body: FormControl<string>;
    type: FormControl<PostTypeEnum>
    createTime: FormControl<number>;
}
