import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { taskRouter } from "./task";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("task.", taskRouter);

export type AppRouter = typeof appRouter;
