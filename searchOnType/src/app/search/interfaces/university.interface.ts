export interface Bock {
  universities: University[];
}

export interface University {
  webPages: string[];
  name: string;
  alphaTwoCode: string;
  stateProvince: null | string;
  domains: string[];
  country: string;
}
