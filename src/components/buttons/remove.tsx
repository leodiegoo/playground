import { Button, Loading, NormalColors } from "@nextui-org/react";
import { FC } from "react";
import { Delete } from "react-iconly";
import { trpc } from "../../utils/trpc";

type RemoveButton = {
  taskId: number;
};

const RemoveButton: FC<RemoveButton> = ({ taskId }) => {
  const utils = trpc.useContext();
  const removeMutation = trpc.useMutation(["task.remove"], {
    async onSuccess() {
      await utils.invalidateQueries(["task.getAll"]);
    },
  });

  const handleRemoveClick = () => {
    removeMutation.mutateAsync({
      id: taskId,
    });
  };

  return (
    <Button
      onClick={handleRemoveClick}
      icon={<Delete set="light" />}
      size="sm"
      rounded
      auto
      ghost
      color="error"
      disabled={removeMutation.isLoading}
    >
      {removeMutation.isLoading ? (
        <Loading color="currentColor" size="sm" />
      ) : (
        "Remove"
      )}
    </Button>
  );
};

export { RemoveButton };
