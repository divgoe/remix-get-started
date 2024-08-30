import * as Sentry from "@sentry/remix";
import {env} from "./app/env.server"

Sentry.init({
    dsn: env.SENTRY_DSN,
    tracesSampleRate: 1,
    autoInstrumentRemix: true
})