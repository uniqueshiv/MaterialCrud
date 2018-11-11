import { EmployeeComponent } from './../employee/employee.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,private dialog: MatDialog) { }

  listData: MatTableDataSource<any>;

  displayedColumns: string[] = ['fullName','email','city','mobile','action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  searchKey="";
  

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        //setTimeout(() => this.listData.paginator = this.paginator);
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onEdit(row) {
   this.service.populateForm(row);
   this.service.initializeFormGroup();
   const dialogConfig= new MatDialogConfig();
   dialogConfig.disableClose=true;
   dialogConfig.autoFocus=true;
   dialogConfig.width="60%";
   this.dialog.open(EmployeeComponent,dialogConfig);
  }

}
