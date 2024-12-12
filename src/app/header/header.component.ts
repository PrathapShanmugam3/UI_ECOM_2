import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categoryitem: any[] = [];
  userName: any;
  displayLogoutConfirmation: boolean = false; // For logout confirmation modal
  subcategoryitem: any;

  constructor(private route: Router, private api: ApiService) { }

  ngOnInit() {
    this.getall();
    let data = localStorage.getItem("res");
    if (data) {
      let item = JSON.parse(data);
      this.userName = item.userName;
    }
  }

  navigateToFood(categoryid: number,subcategoryid:number) {
    this.route.navigate(['/food'], { queryParams: { categoryid: categoryid,subcategoryid:subcategoryid} });
    console.log("Navigated to food with id:", { categoryid: categoryid,subcategoryid:subcategoryid});
  }

  signup() {
    this.route.navigate(['sign']);
  }

  login() {
    this.route.navigate(['login']);
  }

  home() {
    this.route.navigate(['']);
  }

  cart() {
    this.route.navigate(['cart']);
  }

  getall() {
    console.log("getAllCalled");
    
    const data={
      
        "dataCode": "GET_ALL_CATEGORY",
        "placeholderKeyValueMap": {
        }
      
    }
    this.api.customDataGetData('/customdata/getdata',data).subscribe((res) => {
      console.log(res);
      this.categoryitem = res.responseContent;
    });
  }

  // Logout confirmation methods...
  showLogoutConfirmation() {
    this.displayLogoutConfirmation = true;
  }

  closeLogoutConfirmation() {
    this.displayLogoutConfirmation = false;
  }

  confirmLogout() {
    localStorage.removeItem("res");
    this.userName = null;
    this.route.navigate(['login']);
    this.closeLogoutConfirmation();
  }


  getSubCategoryDetails(id:number) {
    console.log(id);

    const data={
      
      "dataCode": "GET_SUBCATEGORY_BY_CATEGORY_ID",
      "placeholderKeyValueMap": {
        "categoryId":id
      }
    
  }
  this.api.customDataGetData('/customdata/getdata',data).subscribe((res) => {
    console.log(res);
    this.subcategoryitem = res.responseContent;
  });
    
    }
}