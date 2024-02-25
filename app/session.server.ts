import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["new secret"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
