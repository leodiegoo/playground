import { z } from "zod";
import { createRouter } from "./context";

export const taskRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.tasks.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      description: z
        .string({
          required_error: "Description is required",
        })
        .min(1)
        .trim(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.tasks.create({
        data: {
          description: input.description,
          userId: ctx.session?.user?.id,
        },
      });
    },
  })
  .mutation("toggle", {
    input: z.object({
      id: z.number(),
      done: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.tasks.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        },
      });
    },
  })
  .mutation("remove", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.tasks.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
