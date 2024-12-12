import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  userId: any;
  nonveg: any[] = [];
  imagePaths: { [key: number]: string } = {};
  category: any;
  categoryId: any;
  subcategoryId: any;

  constructor(
    private api: ApiService,
    private route: Router,
    private routes: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    // Subscribe to query parameters to react to changes
    this.routes.queryParams.subscribe(params => {
      this.categoryId = params['categoryid'];
      this.subcategoryId=params['subcategoryid']
      console.log(this.categoryId,this.subcategoryId, "<========");
      this.getProductsByCategory(); // Fetch products when category changes
    });

    // Get user ID from local storage
    let data = localStorage.getItem("res");
    if (data) {
      let item = JSON.parse(data);
      this.userId = item.id;
    }
  }

  getProductsByCategory() {
    const data={
      
      "dataCode": "GET_PRODUCTS_BY_CATEGORYID_AND_SUB_CATEGORYID",
      "placeholderKeyValueMap": {
        "categoryId":this.categoryId,
        "subCategoryId":this.subcategoryId
      }
    
  }
  this.api.customDataGetData('/customdata/getdata',data).subscribe((res) => {
    console.log(res);
    this.nonveg = res.responseContent;
  });
 
  }


  post(data: any) {
    if (this.userId) {
      let payload: any = {
        productName: data.productName,
        quantity: 1,
        price: data.price,
        image: this.imagePaths[data.id], // Use the imagePaths for the correct image
        user: { id: this.userId },
        productId: data.id
      };

      this.api.post("/cart", payload).subscribe((res) => {
        this.snackbar.showSuccessMessage(res.message);
      });
    } else {
      this.route.navigate(['login']);
    }
  }

  buy() {
    this.route.navigate(['buy']);
  }

  loadImage() {
    console.log("Image Loaded Success");
  }
}