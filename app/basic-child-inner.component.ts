import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'basic-child-inner',
    template: '<a-sphere scale=".5 .5 .5" position="0 -1.5 -6" segments-width="55" segments-height="5" color="pink"></a-sphere>'
})

export class BasicChildInnerComponent { }