import { redirect } from "@remix-run/node";
import { randomId } from "~/lib/randomID";
import { commitSession, getSession } from "~/session.server";

const getUserId = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    session.set("userId", randomId());
    throw redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return session.get("userId")!;
};

export { getUserId };
