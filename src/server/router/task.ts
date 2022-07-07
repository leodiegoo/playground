import * as trpc from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const taskRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const result = await ctx.prisma.tasks.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: true,
        },
      });
      return result;
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
      const exist = await ctx.prisma.tasks.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!exist) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Taskt not found.",
        });
      }

      if (exist.userId) {
        if (!ctx.session?.user.id) {
          throw new trpc.TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to update this task.",
          });
        }

        if (exist.userId !== ctx.session?.user.id) {
          throw new trpc.TRPCError({
            code: "FORBIDDEN",
            message: "You are not allowed to edit this task.",
          });
        }

        return await ctx.prisma.tasks.updateMany({
          where: {
            id: input.id,
            userId: ctx.session?.user?.id,
          },
          data: {
            done: input.done,
          },
        });
      }

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
