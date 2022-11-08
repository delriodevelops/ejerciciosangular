import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightComponent } from './light/light.component';
import { ControllerComponent } from './controller/controller.component';

@NgModule({
  declarations: [LightComponent, ControllerComponent],
  imports: [CommonModule],
  exports: [LightComponent, ControllerComponent],
})
export class LayoutModule {}
