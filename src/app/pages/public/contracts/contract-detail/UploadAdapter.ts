export class UploadAdapter {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
    console.log(this.readThis(loader.file));
  }

  public upload(): Promise<any> {
    //"data:image/png;base64,"+ btoa(binaryString) 
    return this.readThis(this.loader.file);
  }

  readThis(file: File): Promise<any> {
    let imagePromise: Promise<any> = new Promise((resolve, reject) => {
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        let image = myReader.result;
        return { default: "data:image/png;base64," + image };
        resolve();
      }
      // myReader.readAsBinaryString;
    });
    return imagePromise;
  }
}