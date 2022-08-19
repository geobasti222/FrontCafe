import { ShoppingCartPage } from './shopping-cart/shopping-cart.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { MapsPage } from './maps/maps.page';

const routes: Routes = [
  {
    path:'',
    component:HomePage

  },
  {
    path:'maps',
    component:MapsPage
  },
  {
    path:'shopping-cart',
    component:ShoppingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
