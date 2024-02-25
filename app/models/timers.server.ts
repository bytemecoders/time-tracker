export type Timer = {
  start: Date;
  end: Date | null;
  description: string;
  project: string;
  priority: number;
};

const cache: Record<string, Timer[]> = {};

const startTimer = ({
  userId,
  description,
  project,
  priority,
  start,
}: {
  userId: string;
  description: string;
  project: string;
  priority: number;
  start: Date;
}) => {
  cache[userId] = [
    ...(cache[userId] || []),
    {
      start,
      end: null,
      description,
      project,
      priority,
    },
  ];
};

const stopTimer = (userId: string) => {
  const timers = cache[userId] || [];
  const activeTimer = timers.find((timer) => !timer.end);
  if (activeTimer) {
    activeTimer.end = new Date();
  }

  cache[userId] = timers;
};

const getTimers = (userId: string) => {
  return cache[userId] || [];
};

export { startTimer, stopTimer, getTimers };
