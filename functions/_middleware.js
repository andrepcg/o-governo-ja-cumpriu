import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest = sentryPlugin({
  dsn: "https://fdffa5b905ee3b8cbd5ec6b1cc21fdb3@o59404.ingest.sentry.io/4506836757839872",
});
