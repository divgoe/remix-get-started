import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import {env as EnvType} from "./app/env"

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  const completeEnv: EnvType = { ...process.env, ...env }
  return {
    plugins: [
      remix({
        ignoredRouteFiles: ["**/*.css"],
      }),
      sentryVitePlugin({
        // If you use .sentryclirc or environment variables,
        // you don't need to specify these options
        authToken: completeEnv.SENTRY_AUTH_TOKEN,
        org: completeEnv.SENTRY_ORG,
        project: completeEnv.SENTRY_PROJECT,
        sourcemaps: {filesToDeleteAfterUpload: ["build/client/assets/**.js.map"]}
      }),
      tsconfigPaths(),
    ],
    build: {
      sourcemap: true,
    },
  }
});
