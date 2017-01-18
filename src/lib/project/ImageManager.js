export default class ImageManager {
  static async getAvaliableBasicImages() {
    return [
      {
        tag: 'node:moron',
        version: '6.9',
        owner: 'Provided',
        createTime: new Date()
      },

    ];
  }
}
