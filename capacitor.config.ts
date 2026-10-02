import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.bizzye.usinadocorpo',
  appName: 'Usina do Corpo',
  webDir: 'www',
  backgroundColor: '#090909',
  android: {
    // Never allow mixed (http) content. WebView debugging stays on Capacitor's default:
    // enabled only for debug builds, disabled in release.
    allowMixedContent: false,
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
