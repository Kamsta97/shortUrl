import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Url } from 'src/app/models/url';
import { UrlServiceService } from 'src/app/services/url-service.service';

@Component({
  selector: 'app-url-table',
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.css']
})
export class UralTableComponent implements OnInit {

  displayedColumns: string[] = ['urlID', 'url', 'shortUrl', 'entryCount', 'createDate', 'delete'];
  dataSource: Url[] = [];

  @ViewChild(MatTable)
  table!: MatTable<Url>;

  constructor(private urlService: UrlServiceService) { 
    
  }

  ngOnInit(): void {
    this.urlService.dataSourceChange.subscribe(data => {
      this.dataSource = data;
      this.table.renderRows();
    })
  }

  deleteItem(id: any) {
    this.urlService.delete(id).subscribe(() => {
      this.urlService.dataSource = this.urlService.dataSource.filter(x => x.urlID !== id);
      this.dataSource = this.urlService.dataSource;
    })
  }

  refreshData(id:any) {
    const findedItem = this.dataSource.find(x => x.urlID === id);
    if(findedItem) {
      const findedIndex = this.dataSource.indexOf(findedItem);
      findedItem.entryCount += 1
      this.dataSource[findedIndex] = findedItem;
    }
  }
}
