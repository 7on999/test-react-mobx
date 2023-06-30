import { makeAutoObservable, runInAction } from "mobx";

import sample from "./data.json";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Location {
  locationID: number;
  name: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export interface TestLocation {
  testLocationId: string;
  serverIDs: number[];
  locationID: number;
  envID: number;
  hint: string;
}

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];
  testLocations: TestLocation[] = []
  hintActiveForm: string = ''

  fetchData = async () => {
    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
    });
  };

  addTestLocation = (testLocation: Omit<TestLocation, 'hint'>)=>{
    this.testLocations.push({...testLocation, hint:this.hintActiveForm})
    this.hintActiveForm = ''
  }

  addHint = (hint:string)=>{
    this.hintActiveForm = hint
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
