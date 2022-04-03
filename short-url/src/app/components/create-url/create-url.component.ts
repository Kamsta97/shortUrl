import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EncodeService } from 'src/app/services/encode.service';
import { UrlServiceService } from 'src/app/services/url-service.service';
import { Url } from '../../models/url';

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['./create-url.component.css']
})
export class CreateUrlComponent implements OnInit {
  baseUrl = 'http://localhost:4200/'
  longUrl: string = '';
  shortUrl: string = '';
  constructor(
    private urlService: UrlServiceService,
    private encodeService: EncodeService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  changeUrl() {
    if(this.longUrl) {
      this.shortUrl = this.baseUrl + 'redirect/' + this.encodeService.generateId(8);
      const createdUrl: Url = {
        longUrl: this.longUrl,
        shortUrl: this.shortUrl,
        createDate: this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')?.toString() ?? '',
        entryCount: 0
      }

      this.urlService.create(createdUrl).subscribe(url => {
        this.urlService.addNewRecord(url);
      });
    }
  }
}
