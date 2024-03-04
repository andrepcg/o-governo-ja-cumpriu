import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest = async (context) => {
  const dsn = context.env.NEXT_PUBLIC_SENTRY_DSN

  if (!dsn) return context.next();

  return sentryPlugin({ dsn: dsn })(context);
};
