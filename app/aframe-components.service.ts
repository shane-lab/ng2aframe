import { Injectable, ElementRef } from '@angular/core';

declare let AFRAME: any;

/**
 * Converts Angular components to sets of A-Frame entities
 * 
 * @author Shane van den Bogaard
 */
@Injectable()
export class AFrameComponentsService {

    private static readonly SCENE_TAG = 'a-scene';

    private readonly primitives = ((primitives: object) => {
        return Object.keys(primitives)
            .concat(['a-entity', 'a-assets', 'a-asset-item'])
            .map((key) => { return key.trim().toLowerCase(); })
    })(this.isAFrameLoaded() ? AFRAME.primitives.primitives : {});

    /**
     * Convert all Angular components in the A-Frame scene to AEntity
     * 
     * @param sceneRef The scene's element reference
     */
    public mapComponents(sceneRef: ElementRef): void {
        if (!this.isSceneRef(sceneRef)) {
            return;
        }

        const sceneEl: Element = sceneRef.nativeElement

        const primitives = this.primitives;

        let childComponents = this.getChildComponents([], sceneEl);

        childComponents.forEach((element: Element) => {
            if (!element.children) {
                return;
            }

            // set prototype of ng-component element to ANode
            element['__proto__'] = AFRAME.ANode.prototype;

            let entityEl = document.createElement('a-entity');
            // might want to reference the original component
            entityEl.setAttribute('data-origin-component', element.tagName);
            entityEl['originComponent'] = element;

            Array.from(element.children).forEach((child: Element) => {
                // skip if child is in array
                if (!childComponents.includes(child)) {
                    // check if registered as primitive
                    if (primitives.includes(child.tagName.trim().toLowerCase())) {

                        let components = child['components'];
                        if (components) {
                            child['components'] = {};
                            child['parentEl'] = entityEl;
                            child.parentNode.removeChild(child);
                            entityEl.appendChild(child);
                            child['components'] = components;
                        }
                    }
                }
            });

            sceneEl.appendChild(entityEl);
        });
    }

    /**
     * Get all child components from the given element
     * 
     * @param collection The collection of child components
     * @param elem The child component to check
     * @return Array<T extends Element> Returns an array of child components
     */
    private getChildComponents(collection: Element[], elem: Element): Element[] {
        const primitives = this.primitives;

        Array.from(elem.children).forEach((child: Element) => {
            // ingore assets, should be loaded from within the scene component
            let match = child.parentElement.tagName.match(/^a-assets$/i);

            if (!primitives.includes(child.tagName.trim().toLowerCase()) && !match) {
                collection.push(child);
            }

            if (!match && child.children) {
                this.getChildComponents(collection, child);
            }
        });

        return collection;
    }

    /** 
     * Check if the element tag of the given element reference matches the A-Frame scene tag
     * @param elRef The scene's element reference
     * 
     * @return boolean Returns true if the given element reference is valid
     */
    private isSceneRef(elRef: ElementRef) {
        return this.isAFrameLoaded() &&
            (elRef && elRef.nativeElement.tagName.toLowerCase() === AFrameComponentsService.SCENE_TAG);
    }

    /**
     * Check if the A-Frame API is loaded
     * 
     * @return boolean Returns true if the API is defined
     */
    private isAFrameLoaded() {
        return !!window['AFRAME'];
    }
}