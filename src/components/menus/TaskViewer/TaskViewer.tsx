import { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TaskText } from "./TaskText";
import { TaskDelete } from "./TaskDelete";
import { useUpdateTask } from "@/hooks/tasks";

export default function TaskViewer({ context, setContext, isOpen, setIsOpen }) {
  const { mutate: updateTask } = useUpdateTask();

  const task = context?.activeTask;
  const ref = useRef(null);

  const update = (data) => {
    const mergedData = {
      ...context.activeTask,
      ...data,
    };

    updateTask({
      id: task.id,
      data: mergedData,
    });

    setContext({
      ...context,
      activeTask: mergedData,
    });
  };

  function closeMenu() {
    setContext({
      ...context,
      activeTask: null,
    });
    setIsOpen(false);
  }

  return (
    <Transition
      as={Dialog}
      show={isOpen}
      onClose={() => closeMenu()}
      className="relative z-50 flex items-center justify-center"
      initialFocus={ref}
      ref={ref}
    >
      <div className="flex flex-row items-end justify-center fixed inset-0 w-full h-full">
        <Transition.Child
          as={Dialog.Panel}
          enter="transition duration-500"
          enterFrom="translate-y-96"
          enterTo="translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-96"
          className="flex flex-col w-full bg-accent-black-900 text-accent-white border border-accent-white px-2 py-1 rounded-t-xl pb-8 items-center"
        >
          <div className="inset-0 w-full h-fit bg-accent-black-900 flex flex-col items-center p-4 rounded-t-xl">
            <Dialog.Title className="text-xl text-accent-white my-2">
              Viewing Task
            </Dialog.Title>
            <div className="flex flex-col gap-2">
              <TaskText
                name="Title"
                value={task?.title}
                handleSave={(data) => update({ title: data })}
              />
              <TaskText
                name="Description"
                value={task?.description}
                handleSave={(data) => update({ description: data })}
                size="medium"
              />
              <TaskText
                name="Due Date"
                type="datetime-local"
                value={new Date(task?.date)}
                handleSave={(data) => update({ date: data })}
              />
              {task?.repeater && (
                <TaskText
                  name="Repeating"
                  value={task?.repeater}
                  handleSave={(data) => update({ repeater: data })}
                  className="capitalize"
                  disabled
                />
              )}
            </div>
            <div className="my-4">
              <TaskDelete task={task} closeMenu={closeMenu} />
            </div>
            <div className="flex flex-col bottom-6">
              <button
                onClick={() => closeMenu()}
                className="border border-accent-white py-1 px-4 rounded-md text-white bg-accent-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
