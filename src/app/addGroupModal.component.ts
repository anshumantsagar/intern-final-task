import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'addgroupmodal',
    styles: ['row { display:flex; flex-direction: row; justify-content: center }',],
    template: `
    <div class="row" style="display: flex;justify-content: center;flex-direction: column;align-items: center">
        <input [(ngModel)]="groupName" type="text" placeholder="Group name" />
        <br />
        <div *ngIf="toggleFlag" style="position: absolute; margin-right: 20px;" #ignoredInput [colorPicker]="color" 
        [cpDialogDisplay] = "'toggle'"
        (colorPickerChange)="color=$event" 
        [cpPosition] = "'left'"
        [cpToggle] = "true"
        [cpIgnoredElements]="[ignoredButton, ignoredInput]"></div>
       
        <button (click)="alterFlag();lastColor=color"  
         #ignoredButton>select colour</button>
    </div>
    `,
})
export class AddGroupModalComponent {
    @Output() groupData = new EventEmitter()
    groupName: string
    toggleFlag: boolean = false
    lastColor:any
    private color: string = "#127bdc";

    alterFlag() {
        this.toggleFlag = !this.toggleFlag
        if(this.isGroupDataValid()) {
            if(this.color != '127bdc') {
                this.groupData.emit({groupName: this.groupName, color: this.color})
            }
        }
    }

    isGroupDataValid() {
        if(this.groupName && this.color) {
            return true
        }
        else {
            return false
        }
    }
}