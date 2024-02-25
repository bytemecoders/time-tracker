import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  redirect,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { TimersTable } from "~/components/Timers";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getTimers, startTimer, stopTimer } from "~/models/timers.server";
import { getUserId } from "~/models/user.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);

  const timers = getTimers(userId);
  return { userId, timers };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await getUserId(request);
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? "stopped";
  const form = await request.formData();

  const description = form.get("description") as string;
  const project = form.get("project") as string;
  const priority = Number(form.get("priority"));

  if (!description || !project || !priority) {
    return redirect("/?error=invalid");
  }

  if (status === "stopped") {
    startTimer({
      userId,
      description,
      project,
      priority,
      start: new Date(),
    });
    return redirect("/?status=start");
  } else {
    stopTimer(userId);
    return redirect("/?status=stopped");
  }
};

export default function Index() {
  const { timers } = useLoaderData<typeof loader>();
  const [search] = useSearchParams();
  const status = search.get("status") ?? "stopped";

  return (
    <div className="container max-w-2xl py-3">
      <h1 className="text-2xl font-bold">Remix Tracker</h1>
      <p className="mt-2">Track your tasks and measure your progress</p>

      <Form method="POST" className="mt-2 ">
        <div className="flex gap-2">
          <Input
            type="text"
            name="description"
            placeholder="Type something..."
            className="flex-grow"
          />
          <Input
            type="text"
            name="timer"
            placeholder="00:00:00"
            className="w-auto"
          />
          <Button type="submit">
            {status === "stopped" ? "Start " : "Stop "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </Button>
        </div>
        <div className="mt-2 flex gap-2">
          <Select name="project">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Project 1</SelectItem>
              <SelectItem value="2">Project 2</SelectItem>
              <SelectItem value="3">Project 3</SelectItem>
            </SelectContent>
          </Select>
          <Select name="priority">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">High</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Form>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Timers</h2>
        <TimersTable timers={timers} />

      </div>
    </div>
  );
}
