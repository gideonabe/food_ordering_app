declare module 'apollo-upload-client' {
  export class ReactNativeFile {
    constructor(options: {
      uri: string;
      name: string;
      type: string;
    });
  }
}
