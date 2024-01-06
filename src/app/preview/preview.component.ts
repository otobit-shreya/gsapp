import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
  ],
 
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent implements OnInit {
 
 
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Sport ', 'Team1', 'Team2', 'Match Type', 'Winner', 'Score'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getColumnDef(column: string): string {
    // Custom function to clean up column names
    return column.trim();
  }

  getColumnDisplayName(column: string): string {
    // Custom function to display cleaned up column names
    return column.trim();
  }

  ngOnInit() {
    this.getData();
  }

  constructor(private http: HttpClient) {}

  getData() {
    this.http
      .get(`https://sheet.best/api/sheets/46d03b7e-6076-4b66-bf62-532e404ad621`)
      .subscribe(
        (res: any) => {
          console.log('Received data:', res);
          this.dataSource = new MatTableDataSource(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  
}