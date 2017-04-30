import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'basic-child',
    templateUrl: './basic-child.component.html'
})
export class BasicChildComponent {

    @Input()
    private reftest: boolean;

    @ViewChild('itemEl')
    private itemRef: ElementRef

    ngAfterViewInit() {
        // sample manipulation of referenced element
        if (this.reftest) {
            setTimeout(() => {
                let elem = this.itemRef.nativeElement;
                
                if (elem) {
                    elem.setAttribute('primitive', 'sphere');
                    elem.setAttribute('src', '#nebula')
                    elem.setAttribute('theta-length', 360);
                    elem.setAttribute('height', 6);
                    elem.setAttribute('radius', Math.PI);
                }
            }, 4000);
        }
    }
}