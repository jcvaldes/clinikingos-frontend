import { Component, Input, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './export-fab.animations';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-export-fab',
  templateUrl: './export-fab.component.html',
  styleUrls: ['./export-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class ExportFabComponent implements OnInit {
  @Input() options;
  buttons = [];
  fabTogglerState = 'inactive';
  @Input() dataSource;
  @Input() fileName: string;
  @Input() columns: string[];
  constructor() {}

  ngOnInit() {
    const maxButtons = 6;
    if (this.options.buttons.length > maxButtons) {
      console.log(this.options.buttons);
      this.options.buttons.splice(5, this.options.buttons.length - maxButtons);
    }
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.options.buttons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  export($event) {
    switch ($event.toElement.innerText) {
      case 'explicit':
        this.exportTOExcel();
        break;
      case 'picture_as_pdf':
        this.exportTOPdf();
    }
  }
  private exportTOPdf() {
    let doc;
    let rows = [];
    let cols = [];
    let nombre = this.fileName;

    for (let i = 0; i < this.dataSource.length; i++) {
      (this.dataSource[i].enabled === true) ? this.dataSource[i].enabled = 'Verdadero' : this.dataSource[i].enabled = 'Falso';
      delete this.dataSource[i].createdAt;
      delete this.dataSource[i].deletedAt;
      delete this.dataSource[i].updatedAt;
      let row = Object.values(this.dataSource[i]);
      rows.push(row);
    }

    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].search('Fecha') === -1) {
        cols.push(this.columns[i]);
      }
    }
    if (cols.length >= 6) {
      doc = new jsPDF('l');
    } else {
      doc = new jsPDF();
    }

    doc.autoTableSetDefaults({
      headStyles: { fillColor: [155, 89, 182] }, // Purple
      margin: { top: 25 },
      didDrawPage: function(data) {
        doc.setFontSize(15);
        doc.text(nombre, data.settings.margin.left, 20);
      }
    });

    doc.autoTable({
      head: [cols],
      body: rows
    });

    doc.save(nombre + '.pdf');
  }
  private exportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource, {
      cellDates: false
    });

    let fechaCreacion = XLSX.utils.decode_col('F');
    let fmt = '0%';

    let range = XLSX.utils.decode_range(ws['!ref']);

    for (let i = range.s.r + 1; i <= range.e.r; ++i) {
      /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
      let ref = XLSX.utils.encode_cell({ r: i, c: fechaCreacion });
      /* if the particular row did not contain data for the column, the cell will not be generated */
      if (!ws[ref]) {
        continue;
      }
      /* `.t == "n"` for number cells */
      if (ws[ref].t !== 'n') {
        continue;
      }
      /* assign the `.z` number format */
      ws[ref].z = fmt;
    }

    XLSX.utils.sheet_add_json(ws, [], {
      header: this.columns,
      origin: 'A1'
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${this.fileName}`);

    console.log(wb);
    /* save to file */
    XLSX.writeFile(wb, `${this.fileName}.xls`);
  }
}
