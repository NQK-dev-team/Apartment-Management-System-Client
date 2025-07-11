import { defineStore } from 'pinia';

export const managerScheduleStore = defineStore('managerScheduleStore', {
  state: () => ({
    rooms: [] as number[],
  }),
  actions: {
    setRooms(rooms: number[]) {
      this.rooms = rooms;
    },
    getRooms(): number[] {
      return this.rooms;
    },
  },
});
