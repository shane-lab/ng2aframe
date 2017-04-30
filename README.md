### Ng2A-Frame

Converts _**Angular** components_ to _**A-Frame** entities_.

#### Important to note

Allow Angular to use custom elements in your module to use A-Frame entity components.
```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  ...
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
  ...
})
export class AppModule { }
```

#### Setup

Register all components and the ````AFrameComponentsService```` provider in the Angular module. Provide the decorator of the component, which holds the a-scene, with the AFrameComponentsService provider. 

Onto building the scene component:
```ts
import ...

import { AFrameComponentsService } from './aframe-components.service';

@Component({
  ...
  providers: [ AFrameComponentsService ]
  ...
})
export class MySceneComponent {

  constructor(private aFrameComponentsService: AFrameComponentsService) { }
}
```
A requirement to successfully use Angular with Aframe is that the component must pass a reference of the a-scene element to the provider.
```ts
import { Component, ViewChild, ElementRef } from '@angular/core'; 

@Component({
  ...
  providers...
  ...
})
export class ... {

  // create an 'a-scene' element with a referenceable id, e.g. #sceneEl 
  @ViewChild('sceneEl')
  private sceneRef: ElementRef;

  constructor...

  ngAfterViewInit() {
    this.aFrameComponentsService.mapComponents(this.sceneRef);
  }
}
```
Using ````ngAfterViewInit```` we can access all child elements of the a-scene element. **And that's it**. Now A-Frame can use Angular components! 

#### Run demo

```
git clone ...
npm install
npm run start
```

App should start automatically, or visit [localhost:3000](http://localhost:3000) - port 3000 will be used if no other services uses this port.

##### todo

Make converted inner child components append to their converted parent. Currently all components are wrapped around an ````a-entity```` element and are added directly to the scene element. 

The following scenario... 
```html
<!-- mark up of custom-ng-element -->
<a-sphere></a-sphere>
<custom-ng-child-element></custom-ng-child-element>

<!-- mark up of custom-ng-child-element -->
<a-box></a-box>
<a-cylinder></a-cylinder>
```
...once converted becomes:
```html
<a-entity> <!-- references custom-ng-element -->
  <a-sphere></a-sphere>
</a-entity>
<a-entity> <!-- references custom-ng-child-element -->
  <a-box></a-box>
  <a-cylinder></a-cylinder>
</a-entity>
```
The prefered way would be...
```html
<a-entity> <!-- references custom-ng-element -->
  <a-sphere></a-sphere>
  <a-entity> <!-- references custom-ng-child-element -->
    <a-box></a-box>
    <a-cylinder></a-cylinder>
  </a-entity>
</a-entity>
```
...to keep the position, rotation etc from its parent.