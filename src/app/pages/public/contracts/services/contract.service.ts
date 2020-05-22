import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { throwError } from 'rxjs';
import { FileItem } from '../../../../models/file-item';
import { HttpService } from '../../../../services/shared/http.service';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Contract } from '../contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private url: string;
  private CARPETA_TEMPLATES = 'templates';
  private itemsCollection: AngularFirestoreCollection<any>;
  public contracts: any[] = [];
  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.url = 'https://tudocdigital.firebaseio.com';
  }

  fileUploadFirebase(files: FileItem[], meta: { title: string }): Promise<FileItem> {
    // referencia al storage de firebase
    const storageRef = firebase.storage().ref();
    return new Promise(async (resolve, reject) => {
      for (const item of files) {
        item.estaSubiendo = true;
        if (item.progreso >= 100) {
          continue;
        }
        const uploadTask: firebase.storage.UploadTask =
          storageRef.child(`${this.CARPETA_TEMPLATES}/${item.nombreArchivo}`)
            .put(item.archivo);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) =>
            item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          (error) => reject(`Error al subir ${error}`),
          () => {
            console.log('Archivo cargado correctamente');
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              item.estaSubiendo = false;
              item.url = downloadURL;
              this.saveFile({
                title: meta.title,
                fileName: item.nombreArchivo,
                url: item.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }).then(data => {
                item.id = data.id;
                resolve(item);
              });
            });
          });
      }
    });
  }

  fileRemoveFirebase(filename: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // referencia al storage de firebase
      const storageRef = firebase.storage().ref().child(`${this.CARPETA_TEMPLATES}/${filename}`);
      storageRef.delete().then((data) => {
        debugger
      }).catch(err => {
        throwError(err);
      });
    });
  }
  // agrego al storage de Firebase
  async saveFile(imagen: { title: string, fileName: string, url: string, createdAt: Date, updatedAt: Date }) {
    return await this.afs.collection(`/${this.CARPETA_TEMPLATES}`)
      .add(imagen);
  }
  getContracts() {
    this.itemsCollection = this.afs.collection<any>('templates');
    return this.itemsCollection.snapshotChanges() // .valueChanges();
      .pipe(
        map( docData => {
          return docData.map( doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        } )
      )
    // return await this.afs.collection(`/${this.CARPETA_TEMPLATES}`)
    //   .add(imagen);
  }
  async delete(id: string) {
    debugger
    return await this.afs.doc(`/templates/${id}`).delete();
  }
  // agrego al storage de Firebase
  async save(imagen: { nombre: string, url: string }) {
    return await this.afs.collection(`/${this.CARPETA_TEMPLATES}`)
      .add(imagen);
  }
  // async getAll() {
  //   return this.http.get(`${ this.url }/templates.json`)
  //   .pipe(
  //     map( this.crearArreglo ),
  //     delay(0)
  //   );
  //   await this.afs.collection(`/${this.CARPETA_TEMPLATES}`).snapshotChanges()
  //   .pipe(
  //     map(actions => {
  //       debugger
  //       // return actions.map(a => {
  //       //   const data = a.payload.doc.data();
  //       //   const id = a.payload.doc.id;
  //       //   return { id, ...data };
  //       // });
  //     })
  //   )
  // }

  // private crearArreglo( contractsObj: object ) {
  //   debugger
  //   const contracts: Contract[] = [];

  //   Object.keys( contractsObj ).forEach( key => {

  //     const contract: Contract = contractsObj[key];
  //     contract.id = key;

  //     contracts.push( contract );
  //   });


  //   return contracts;

  // }
}
