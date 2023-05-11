import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { faEdit, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from './../../services/data.service';

interface Data {
  item: any;
  type: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  data: Data;
  subscription!: Subscription;
  editToggle = false;

  faX = faX;
  faEdit = faEdit;
  faSave = faSave;

  constructor(private dialogRef: DialogRef<Data>, @Inject(DIALOG_DATA) data: Data, private dataService: DataService, private router: Router) {
    this.data = data;
    this.data.type === 'kanji' ? this.data.type = 'Kanji': this.data.type = 'Word';
    console.log(this.data.type);
  }

  ngOnInit(): void {
    let type = this.router.url.split('/')[1] as 'kanji' | 'words';

    if(type === 'kanji') {
      this.subscription = this.dataService.shouldUpdateKanji$.subscribe((shouldUpdate: boolean) => {
        if(shouldUpdate) {
          this.dataService.getOneKanji(this.data.item._id).subscribe((item: any) => {
            console.log('updated dialog', item);
            this.data.item = item;
          });
        }
      });
    } else {
      this.subscription = this.dataService.shouldUpdateWords$.subscribe((shouldUpdate: boolean) => {
        if(shouldUpdate) {
          this.dataService.getOneWord(this.data.item._id).subscribe((item: any) => {
            console.log('updated dialog', item);
            this.data.item = item;
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleBack(toggle: any) {
    this.editToggle = toggle.toggle;
  }

}
