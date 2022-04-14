export  class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
        this._userNameElement = document.querySelector(profileNameSelector);
        this._userJobElement = document.querySelector(profileJobSelector);
        this._profileAvatarElement = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userJobElement.textContent
        }
    }

    setUserInfo(title, job, avatarLink) {
        this._userNameElement.textContent = title;
        this._userJobElement.textContent = job;
        this._profileAvatarElement.src = avatarLink;
    }


}