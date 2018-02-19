import { observable, action, reaction } from 'mobx';
import api from '../api';

class CommonStore {

  @observable appName = 'React-Mobx';
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;
  @observable example = null

  @observable tags = [];
  @observable isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action loadTags() {
    this.isLoadingTags = true;
    return api.Tags.getAll()
      .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
      .finally(action(() => { this.isLoadingTags = false; }))
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

  @action getExampleText() {
    return this.example;
  }

  @action setExampleText(new_text) {
    this.example = new_text;
  }

}

export default new CommonStore();
