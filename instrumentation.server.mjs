import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "https://5a2821d671c1125eb37fc6068d623cf5@o4507866612105216.ingest.us.sentry.io/4507866616496128",
    tracesSampleRate: 1,
    autoInstrumentRemix: true
})