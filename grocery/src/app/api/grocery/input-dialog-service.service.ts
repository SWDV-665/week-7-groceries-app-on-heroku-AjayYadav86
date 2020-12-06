import { PropertyRead } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {GroceryService} from '../grocery/GroceryService';

@Injectable({
  providedIn: 'root'
})
/* InputDialogService is manage the Alert Prompt Option*/

export class InputDialogServiceService {

  constructor(public toastController: ToastController,
    public alertController: AlertController,
    public dataService: GroceryService ) { }


  /*ShowPrompt Method will be triggered for Add Item and Edit Item alert */
  async EditPrompt(item?,index?) {
    const prompt = await this.alertController.create({
      header : item ? 'Edit Item' : 'Add Item',
      message : item ? 'Please Edit Item...' : 'Please enter Item....',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name: null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder : 'Quantity',
          value: item ? item.quantity: null
        },
        {
          name: '_id',
          type: 'text',
          placeholder : 'id',
          value: item ? item._id: null,
          disabled: true
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: item => {
            console.log('Confirm Ok');
            console.log(item.name);
            console.log('values are::'+item.name+'::'+item._id);
              this.dataService.editItem(item);
          }
        }
      ]
    });
    await prompt.present();
  }


  async AddPrompt() {
    const prompt = await this.alertController.create({
      header :  'Add Item',
      message : 'Please enter Item....',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder : 'Quantity',
          value: null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: item => {
            console.log('Confirm Ok');
            console.log(item.name);
            console.log('values are::'+item.name+'::'+item._id);
              this.dataService.addItem(item);     
          }
        }
      ]
    });
    await prompt.present();
  }


}
