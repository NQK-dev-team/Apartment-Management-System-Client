import { defineStore } from 'pinia';

export const jwtStore = defineStore('jwtStore', {
  state: () => ({
    fullName: '',
    imagePath: '',
    isCustomer: false,
    isManager: false,
    isOwner: false,
    userID: '',
  }),
  getters: {
    getFullName(state) {
      return state.fullName;
    },
    getImagePath(state) {
      return state.imagePath;
    },
    getID(state) {
      return state.userID;
    },
    getRole(state) {
      let resultStr = '';
      resultStr += state.isOwner ? '1' : '0';
      resultStr += state.isManager ? '1' : '0';
      resultStr += state.isCustomer ? '1' : '0';
      return resultStr;
    },
  },
  actions: {
    setStorage(
      fullName: string,
      imagePath: string,
      isOwner: boolean,
      isManager: boolean,
      isCustomer: boolean,
      userID: string
    ) {
      this.fullName = fullName;
      this.imagePath = imagePath;
      this.isOwner = isOwner;
      this.isManager = isManager;
      this.isCustomer = isCustomer;
      this.userID = userID;
    },
  },
});
