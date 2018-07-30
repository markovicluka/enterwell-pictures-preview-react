import { observable} from 'mobx';

class State {

  @observable
  pictures = [];

  @observable
  isModalPictureOpen = false;


  @observable
  isModalAuthorOpen = false;

  @observable
  information = {}; // information of the picture for PictureModal (Prikaz B)

  @observable
  statistics = {};  // information of the picture statistics for picture rendered in PictureModal (Prikaz B)

  @observable
  authorsPictures = []; // pictures of author rendered in AuthorModal (Prikaz C)

  @observable
  pageNumber = 1;

}

export default new State();
