import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule, Modal } from 'ng2-modal'
import { TagInputModule } from 'ng2-tag-input'
import { FormsModule } from '@angular/forms'
import { CKEditorModule } from 'ng2-ckeditor'
import { SelectModule } from 'ng2-select'
import { ColorPickerModule } from 'angular2-color-picker'
import { DndModule } from 'ng2-dnd'

import { AppComponent }  from './app.component';
import { AddUser } from './adduser.component'
import { UserModal } from './userModal'
import { AddGroup } from './addGroup.component'
import { AddGroupModalComponent } from './addGroupModal.component'

@NgModule({
  imports:      [ 
  BrowserModule,
  ModalModule,
  FormsModule,
  CKEditorModule,
  SelectModule,
  ColorPickerModule,
  //DndModule.forRoot()
  ],
  declarations: [ 
    AppComponent,
    AddUser,
    UserModal,
    AddGroup,
    AddGroupModalComponent
   ],
  bootstrap:    [ AppComponent ],
  providers: [Modal]

})
export class AppModule { }
