import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  articles: any = []

  results: any = [];

  constructor(private orgService: OrganizationService, private http: HttpClient) { }

  ngOnInit() {
    // Call loadAll function in countriesService
    this.orgService.loadAll().subscribe((data) => {
      console.log(data);
      this.articles = data['articles'];
    });
  }

}
