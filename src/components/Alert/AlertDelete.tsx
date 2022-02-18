import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
} from "@chakra-ui/react";
import styles from "./alert.module.css";
import clsx from "clsx";

interface AlertDeleteProps
  extends Omit<AlertDialogProps, "leastDestructiveRef" | "children"> {
  title: string;
  itemToRemove: any;
  onDelete: (itemToRemove: any) => void;
}

export default function AlertDelete({
  title,
  itemToRemove,
  isOpen,
  onClose,
  onDelete,
}: AlertDeleteProps) {
  const cancelRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(itemToRemove);
    setLoading(false);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} className="!px-4">
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              className="!px-4"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
