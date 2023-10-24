import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatBottomSheetModule,
    MatPaginatorModule,
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatBottomSheetModule,
    MatPaginatorModule,
  ],
})
export class MaterialTestingModule {}
