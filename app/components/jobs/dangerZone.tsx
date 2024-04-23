"use client";
import { deleteJob } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export const DangerZone = ({ jobId }: { jobId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Accordion
        itemClasses={{
          heading: "bg-red-700 bg-opacity-90 px-2 rounded-t-md",
          // base: "bg-red-700",
          title: "text-gray-100",
          indicator: "text-gray-100",
          content: "bg-red-400 bg-opacity-60 px-2 rounded-b-md",
        }}
        //   variant="shadow"
      >
        <AccordionItem
          key="danger_accordion_1"
          aria-label="Danger Zone"
          title="Danger Zone"
        >
          <Button
            variant="light"
            color="danger"
            startContent={<TrashIcon className="h-6 w-6" />}
            onPress={onOpen}
            fullWidth
          >
            Delete Job
          </Button>
        </AccordionItem>
      </Accordion>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?!
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this job application? This
                  action cannot be undone!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  startContent={
                    isDeleting ? (
                      <Spinner size="sm" color="danger" />
                    ) : (
                      <TrashIcon className="h-6 w-6" />
                    )
                  }
                  onPress={async () => {
                    setIsDeleting(true);
                    await deleteJob(jobId);
                    onClose();
                    setIsDeleting(false);
                  }}
                >
                  Yes, delete this job
                </Button>
                <Button color="danger" onPress={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
