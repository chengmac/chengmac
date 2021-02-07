import { defineConfig } from 'umi';
import themeConfig from './config/theme.config.ts';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
  },
  theme: themeConfig,
  outputPath: './chengmac',
});
