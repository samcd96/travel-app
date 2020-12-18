// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Auth } from 'aws-amplify';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   public user: any;

//   constructor(public router: Router) {}

//   onAuthEvent() {
//     Auth.currentSession()
//       .then((state) => {
//         console.log(state);
//         this.user = state;
//         if (!this.user) {
//           this.router.navigate(['/auth']);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         this.user = null;
//         this.router.navigate(['/auth']);
//       });
//   }
// }
