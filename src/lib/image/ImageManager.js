import Image from './model/Image';

export default class ImageManager {

  static async getAvaliableBasicImages() {
    return Image.find({ }).exec();
  }

}
