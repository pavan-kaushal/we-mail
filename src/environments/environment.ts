export interface EnvironmentVariables {
    production: boolean,
    name: string,
    apiUrl: string,
    vapidPublicKey: string,
}

export const environment: EnvironmentVariables = {
  production: false,
  apiUrl: 'http://localhost:3000',
  name: 'development',
  vapidPublicKey: '',
};