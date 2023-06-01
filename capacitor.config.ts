import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.resumebuilder.farhan',
  appName: 'resume-builder',
  webDir: 'dist/resume-builder',
  server: {
    androidScheme: 'https'
  }
};

export default config;
