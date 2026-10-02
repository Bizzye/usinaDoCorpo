import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.bizzye.usinadocorpo',
  appName: 'Usina do Corpo',
  webDir: 'www',
  backgroundColor: '#090909',
  android: {
    // Never allow mixed (http) content or WebView debugging in release builds
    allowMixedContent: false,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SystemBars: {
      // Light icons over the dark header; safe areas exposed as CSS env() variables
      style: 'DARK',
      insetsHandling: 'css',
      initialViewportFitValueHint: 'cover',
    },
  },
};

export default config;
