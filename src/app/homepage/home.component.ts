import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from '../services/product.model';
import { User_item_service } from '../services/user_item.service';

import { Router } from '@angular/router';
export interface product {

  Name: string;
}

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy{

  // products: Product[] = [{
  //   "name":"guitar",
  //   "description":"electric guitar",
  //   "price":"1500",
  //   "city":"ahm",
  //   "state":"guj",
  //   "id":"xyz",
  //   "main_category":"music",
  //   "sub_category":"electronic",
  //   "userId":"abc"
  // }];
  posts: Product[] = [];
  private postsSub: Subscription;
  totalPosts=10;
  postsPerPage=4;
  currentPage = 1;
  pageSizeOptions = [4,8,12];




  constructor(public postsService: User_item_service,private router: Router) {

  }

  ngOnInit() {
    // console.log('1) ');

    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((productData: {posts: Product[], postCount: number}) => {
        this.posts = productData.posts;
        this.totalPosts = productData.postCount;
        //console.log(this.posts);
      });
    //   console.log('2) ');
    // console.log('homeComponent ', this.posts);
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  viewProduct(id: string){
    this.router.navigate(['/viewproduct'], { state: { product_id: id } });
  }

  // pagedItem here is used just to check pager will habe all pageditems

  pagedItems: Array<product> = [
    {
      Name: 'Real Estate',
    },
    {
      Name: 'Vehicle'
    },
    {
      Name: 'Electronics'
    },
    {
      Name: 'Sports'
    },
    {

      Name: 'Furniture'
    },
    {
      Name: 'Books'
    },
    {
      Name: 'Hobby'
    },
    {
      Name: 'Educational'
    },
    {
      Name: 'Clothing'
    },
    {
      Name: 'Others'
    }
  ];

    // array of all items to be paged
    //private allItems: any[];
// NOTE: here we have to fetch all the items from the server !! (not server side pagination)

    // pager object
    // pager: any = {totalItems: 17,
    //   currentPage: 2,
    //   pageSize: 5,
    //   totalPages: 4,
    //   startPage: 3,
    //   endPage: 7,
    //   startIndex: 6,
    //   endIndex: 7,
    //   pages: [3,4,5,6,7]
    // }
    // paged items
    //pagedItems: any[];
/*
    ngOnInit() {
        // get dummy data
        this.http.get('./dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;
                // initialize to page 1
                this.setPage(1);
            });
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  */
   book(){

   }
}
