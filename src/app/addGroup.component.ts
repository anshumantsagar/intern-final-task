import { Component } from '@angular/core'

@Component({
    selector: 'addgroup',
    styles: [],
    template: `
    <div style="width: 300px; margin-bottom: 20px;">
      <h3>Select group</h3>
      <ng-select  [multiple]="true"
                  [items]="addedGroupList"
                  (data)="handleSelectedGroup($event)"
                  placeholder="No city selected">
      </ng-select>
      <button class="btn btn-secondary" (click)="groupModal.open()">+</button>
      <modal #groupModal>
    <modal-header>
        <h1>Modal Header</h1>
    </modal-header>
    <modal-content>
        <addgroupmodal (groupData)="handleGroupData($event)"l></addgroupmodal>
    </modal-content>
    <modal-footer>
        <button class="btn btn-primary" (click)="saveGroup()">save</button>
        <button class="btn btn-primary" (click)="groupModal.close()">Close</button>
    </modal-footer>
   </modal>
    </div>
    `,
})

export class AddGroup {
    groupModalData: JSON
    selectedGroup: string[]
    addedGroupList:any = []
    handleSelectedGroup($event:string) {}

    handleGroupData(event:JSON) {
        this.groupModalData = event
        console.log(this.groupModalData)
    }
    saveGroup() {
        if(this.groupModalData) {
            this.addedGroupList.push(this.groupModalData)
        }
        console.log(this.addedGroupList)
    }
}