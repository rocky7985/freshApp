import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';

export const authGuard: CanActivateFn = (route, state) => {

  const CommonService = inject(CommonserviceService);
  const router = inject(Router);

  const user_data = localStorage.getItem('login');
  // const isHardRefresh = localStorage.getItem('isRefreshed') == 'true';

  if(user_data){
    return true;
  }
  else{
    router.navigate(['/login']);
    CommonService.presentToast('Not Authenticated');
    return false;
  }
};

window.addEventListener('beforeunload', () => {
  localStorage.setItem('isRefreshed', 'true');
});
