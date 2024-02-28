export interface EnvironmentVariables {
    name: string,
    apiUrl: string,
}

export const environment: EnvironmentVariables = {
  apiUrl: 'http://localhost:3000',
  name: 'development',
};