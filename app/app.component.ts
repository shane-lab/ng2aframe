import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

import { AFrameComponentsService } from './aframe-components.service';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ AFrameComponentsService ]
})
export class AppComponent {

    @ViewChild('sceneEl')
    private sceneRef: ElementRef;

    constructor(private aFrameComponentsService: AFrameComponentsService) { }

    ngAfterViewInit() {
        this.aFrameComponentsService.mapComponents(this.sceneRef);
    }
}
