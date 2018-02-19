import { observable, action } from 'mobx';
import api from '../api';

class ProfileStore {

  @observable profile = undefined;
  @observable isLoadingProfile = false;

  @action loadProfile(username) {
    this.isLoadingProfile = true;
    api.Profile.get(username)
      .then(action(({ profile }) => { this.profile = profile; }))
      .finally(action(() => { this.isLoadingProfile = false; }))
  }

  @action follow() {
    if (this.profile && !this.profile.following) {
      this.profile.following = true;
      api.Profile.follow(this.profile.username)
        .catch(action(() => { this.profile.following = false }));
    }
  }

  @action unfollow() {
    if (this.profile && this.profile.following) {
      this.profile.following = false;
      api.Profile.unfollow(this.profile.username)
        .catch(action(() => { this.profile.following = true }));
    }
  }
}

export default new ProfileStore();
