import { Component, ElementRef, ComponentDecorator } from '@angular/core';

export function NgAFrameComponent(annotation: any) {
  return (target: Function) => {
    let parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    
    let metadata = new Component(annotation);
    // Reflect.defineMetadata('annotations', [ metadata ], target);
  }
}