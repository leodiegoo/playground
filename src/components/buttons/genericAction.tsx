import { Button, Loading, NormalColors } from "@nextui-org/react";
import { FC, ReactNode } from "react";
import { CloseSquare, TickSquare } from "react-iconly";
import { trpc } from "../../utils/trpc";

import toast from "react-hot-toast";
import { TRPCClientError } from "@trpc/client";

type GenericActionButton = {
  taskId: number;
  done: boolean;
};

const GenericActionButton: FC<GenericActionButton> = ({ taskId, done }) => {
  const utils = trpc.useContext();
  const toggleMutation = trpc.useMutation(["task.toggle"], {
    async onSuccess() {
      await utils.invalidateQueries(["task.getAll"]);
    },
  });

  const handleClickToggle = async () => {
    try {
      await toggleMutation.mutateAsync({
        done: !done,
        id: taskId,
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error(error.message);
      }
      console.log({ error });
    }
  };

  const generic: {
    [key: string]: {
      icon: ReactNode;
      color: NormalColors;
    };
  } = {
    false: {
      icon: <TickSquare set="light" />,
      color: "success",
    },
    true: {
      icon: <CloseSquare set="light" />,
      color: "warning",
    },
  };

  return (
    <Button
      onClick={handleClickToggle}
      size="sm"
      rounded
      auto
      ghost
      color={generic[done ? "true" : "false"].color}
      disabled={toggleMutation.isLoading}
    >
      {toggleMutation.isLoading ? (
        <Loading color="currentColor" size="sm" />
      ) : (
        generic[done ? "true" : "false"].icon
      )}
    </Button>
  );
};

export { GenericActionButton };
