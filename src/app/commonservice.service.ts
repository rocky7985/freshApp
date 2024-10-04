import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(
    private toast: ToastController,
    private alert: AlertController
  ) { }

  async presentToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async presentAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alert.create({
      header,
      message,
      buttons,
    });
    await alert.present();
  }
}

