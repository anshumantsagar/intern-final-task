import { Component, ViewChild, ElementRef, ViewChildren } from '@angular/core';


@Component({
  selector: 'adduser',
  styles: [
      'i { padding: 0 10px; }',
      'row { display:flex; flex-direction: row; justify-content: center }'
  ],
  template: `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Group</th>
      <th scope="col">Role</th>
      <th scope="col">Action</th>
      <th scope="col"><button #addButton type="button" (click)="userModal.open();userCkFlag = true" class="btn btn-secondary">+Add</button></th> 
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of userData; let indx=index">
      <th scope="row">1</th>
      <td><h3>{{user.name}}</h3></td>
      <td *ngFor="let group of user.groupSelected">{{group.text}}</td>
      <td><h3>{{user.role.text}}</h3></td>
      <td><i (click)="mailModal.open()" class="material-icons">
      mail_outline
      </i><i (click)="editUserDetail(indx);userModal.open()" class="material-icons">
      create
      </i><i (click)="deleteModal.open();deleteIndex=indx" class="material-icons">
      delete_sweep
      </i></td>
    </tr>
  </tbody>
</table>

<modal #userModal
      [closeOnEscape] = false
      [closeOnOutsideClick] = false>
    <modal-header>
        <h1>Modal Header</h1>
    </modal-header>
    <modal-content>
    <div *ngIf = "userCkFlag">
        <usermodal (ifUserModalClosed)="checkIfModalClosed($event)" [dataToEdit]="dataToEdit" (saveUserData)="saveData($event)"></usermodal>
        </div>
    <div #closeButton (click)="userModal.close()"></div>
    </modal-content>
    
</modal>

<modal #mailModal>
  <modal-header>
    <h1>Send mail</h1>
  </modal-header>
  <modal-content>
    
  </modal-content>
</modal>

<modal #deleteModal>
  <modal-content>
    Are you sure ?
  </modal-content>
  <modal-footer>
    <button class="btn btn-secondary" (click)="deleteUser();deleteModal.close()">delete</button>
    <button class="btn btn-secondary"  (click)="deleteModal.close()">Cancel</button>
  </modal-footer>
</modal>
    
  `,
})
export class AddUser  { 
    @ViewChild('addButton') addButtonRef: ElementRef;
    @ViewChild('userModal') userModal:ElementRef
    @ViewChild('closeButton') closeButton:ElementRef;
    userCkFlag:boolean = false;
    userData:JSON[] = []
    dataToEdit: any
    editIndex = 0
    deleteIndex = 0
      constructor() {
        
      }

    saveData(event:JSON) {
      if(this.isUserDataValid(event)) {
        if(event["toEdit"]) {
        this.userData[this.editIndex] = Object.assign({},event)
        this.userData[this.editIndex]["toEdit"] = false
      }
      else {
        this.userData.push(Object.assign({},event))
      }
      this.closeButton.nativeElement.click()
      }
    }

    isUserDataValid(data:any) {
      if(data.name
        && data.groupSelected
        && data.role
        && data.about) {
          return true
        }
        else {
          return false
        }
    }
    editUserDetail(indexOfUserData:any) {
      this.editIndex = indexOfUserData
      this.userData[indexOfUserData]["toEdit"] = true
      console.log("editor")
      console.log(this.userData)
      this.dataToEdit = Object.assign({},this.userData[indexOfUserData])
    }
    deleteUser() {
      this.userData.splice(this.deleteIndex, 1)
    }
    checkIfModalClosed(event:any) {
      if(event){
        this.closeButton.nativeElement.click()
      }
    }
 }
