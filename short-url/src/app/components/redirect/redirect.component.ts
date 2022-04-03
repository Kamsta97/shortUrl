import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlServiceService } from 'src/app/services/url-service.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private urlService: UrlServiceService,
    private router: Router
    ) { 
    const fullUrl = 'http://localhost:4200' + router.url;
    this.urlService.getAll().subscribe(data => {
      const selectedUrl = data.find(x => x.shortUrl === fullUrl);
      if(selectedUrl) {
        selectedUrl.entryCount += 1;
        this.urlService.update(selectedUrl.urlID, selectedUrl).subscribe(data => {
          this.urlService.getAll().subscribe(allUrls => {
            this.urlService.dataSource = allUrls;
            this.document.location.href = selectedUrl.longUrl;  
          });
        })
    } else {
      router.navigate(['/']);
    }
    })
  }

  ngOnInit(): void {
  }

}
