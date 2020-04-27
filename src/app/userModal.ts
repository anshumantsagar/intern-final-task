import { Component, ViewChild, Input,Output, ElementRef, EventEmitter } from '@angular/core';


@Component({
    selector: 'usermodal',
    styles: [
      'row { display:flex; flex-direction: row; justify-content: center }',
    ],
    template: `
    <div class="cotainer">
    <div class="row" style="display:flex;justify-content:center;flex-direction:column;align-items:center">
    <input [(ngModel)]="userData.name" placeholder="Name" />
    <br />
    <ckeditor [(ngModel)]="userData.about" (ready)="ckEditorInitialized($event)" [config]="ckEditorConfig" debounce="0"></ckeditor>
    <div style="width: 300px; margin-bottom: 20px;">
      <h3>Select user Role</h3>
      <ng-select [allowClear]="true"
              [items]="roleList"
              (data) = getUserRoleData($event)
              placeholder="No user selected">
      </ng-select>
    </div>
    <div style="width: 300px; margin-bottom: 20px;">
      <h3>Select group</h3>
      <ng-select  [multiple]="true"
                  [items]="addedGroupList"
                  (data)="handleSelectedGroup($event)"
                  placeholder="Select group">
      </ng-select>
      <button class="btn btn-secondary" (click)="groupModalFlag=true;groupModal.open();">+</button>
      <modal #group>
    <modal-header>
        <h1>Modal Header</h1>
    </modal-header>
    <modal-content>
        <addgroupmodal (groupData)="handleGroupData($event)"></addgroupmodal>
    </modal-content>
    <modal-footer>
        <button class="btn btn-primary" (click)="saveGroup()">save</button>
        <button class="btn btn-primary" (click)="group.close();closeGroupModal()">Close</button>
    </modal-footer>
   </modal>
    </div>
    <button class="btn btn-primary" (click)="saveData()">save</button>
    <button class="btn btn-primary" (click)="closeUserModal()">close</button> 
    </div>
    </div>
    `,
})

export class UserModal {
  @Input() dataToEdit:any  //is the data to edit input from the addUser class
  @Input() ckflag:any
  @Output() saveUserData = new EventEmitter();  //Emitter for sendig data to the 
  @Output() ifUserModalClosed = new EventEmitter();
  @ViewChild('group') groupModal: ElementRef;

  doCheck = true //doCheck boolean stops the change detection when turn to false
  
  userData:any = {
    name: '',
    about: '',
    role: '',
    groupSelected: [],
    toEdit: false
  }
  
  //Used to detect the change in the component until it fount the data to edit
  ngDoCheck() {
    if(this.dataToEdit && this.doCheck) {
      this.userData = this.dataToEdit
      this.doCheck = false
    }
  }

  groupModalData: JSON;
  groupModalFlag:boolean = true;
  selectedGroup: string[];
  addedGroupList:any = [];
  public roleList: string[] = ['platinum', 'gold', 'silver'];
  public groupList: string[] = [];
  ckeConfig: any;

  ckEditorConfig: {} = {
    "language": "en",
    "uiColor": "#ffffff",
    "toolbarGroups": [
      { "name": "basicstyles" },
      { "name": "paragraph", groups: ["list", "align"] },
      { "name": "styles" },
      { "name": "tools" },
      { "name": "editing" },
    ],
    "removeButtons": "Strike,Subscript,Superscript,Anchor,Cut,Copy,Paste,ShowBlocks,Smiley,Iframe,BGColor,HorizontalRule,SpecialChar,PageBreak,Image,Flash,Styles,Font",
    "extraPlugins": "divarea",
    "removePlugins": "resize",
    "resize_enabled": false 
  };
  content: string;
  /**
   * ckEditorInitialized is called by the ckEditor when it rendered
   * @param event is send by the ckEditor
   */
  ckEditorInitialized(event: any) {
    let blockTags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'li', 'blockquote', 'ul', 'ol', 'table', 'thead', 'tbody', 'tfoot', 'td', 'th'];
    for (let i = 0; i < blockTags.length; i++) {
      event.editor.dataProcessor.writer.lineBreakChars = '';
      event.editor.dataProcessor.writer.setRules(blockTags[i], {
        indent: false,
        breakBeforeOpen: false,
        breakAfterOpen: false,
        breakBeforeClose: false,
        breakAfterClose: false
      });
    }
  }
   /* Function stores the forms input for user role
   * @param event event is the string value for the user role
   */
  getUserRoleData(event:string) {
    this.userData.role = event
  }
  /**
   * function handles the value of the selected group 
   * @param event event is the string value for the group name
   */
  handleSelectedGroup(event:string) {
    this.userData.groupSelected = event 
  }

    handleGroupData(event:JSON) {
        this.groupModalData = event
    }
    saveGroup() {
        if(this.groupModalData) {
            this.addedGroupList = [...this.addedGroupList,this.groupModalData["groupName"]]
            this.ifGroupModalClosed.emit('closed')
            this.groupModal.nativeElement.click()
        }
    }
    saveData() {
      console.log(this.userData)
      this.saveUserData.emit(this.userData)
      this.userData = {
        name: '',
        about: '',
        role: '',
        groupSelected: [],
      }
    }
    //used to close the group modal
    closeGroupModal() {
      this.userData["toEdit"] = false
    }

    // Closes the user registration Modal
    closeUserModal() {
      this.userData = {
        name: '',
        about: '',
        role: '',
        groupSelected: [],
        toEdit: false
      }
      this.dataToEdit = null
      this.ifUserModalClosed.emit(true)
      this.doCheck = true
    }
}