export  class UserInfo {
    constructor({profileNameSelector, profileJobSelector}) {
        this._userNameElement = document.querySelector(profileNameSelector);
        this._userJobElement = document.querySelector(profileJobSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userJobElement.textContent
        }
    }

    setUserInfo(title, job) {
        this._userNameElement.textContent = title;
        this._userJobElement.textContent = job;
    }
}