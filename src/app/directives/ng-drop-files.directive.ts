import { NotificationService } from './../shared/notification.service';
import { FileItem } from './../models/file-item';
import {
  Directive, EventEmitter, ElementRef,
  HostListener, Input, Output
} from '@angular/core';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Input() filesCount = 1;
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private notificationService: NotificationService,
  ) { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }
    if ( transferencia.files.length === this.filesCount) {
      this._getFiles(transferencia.files);
    } else {
      this.notificationService.error(`:: Solo se puede agregar ${this.filesCount} templates al contrato`);
    }
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);

  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getFiles(archivosLista: FileList) {

    // console.log( archivosLista );

    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {

      const archivoTemporal = archivosLista[propiedad];

      if (this._canFileLoaded(archivoTemporal)) {

        const nuevoArchivo = new FileItem(archivoTemporal);
        this.files.push(nuevoArchivo);

      }
    }
  }


  // Validaciones
  private _canFileLoaded(archivo: File): boolean {

    if (!this._fileExists(archivo.name) && this._isPDF(archivo.type)) {
      return true;
    } else {
      return false;
    }

  }


  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileExists(nombreArchivo: string): boolean {

    for (const archivo of this.files) {

      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;
      }

    }

    return false;
  }

  private _isPDF(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.endsWith('pdf');
  }


}