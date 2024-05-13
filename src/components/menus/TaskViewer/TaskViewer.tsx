import { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TaskText } from "./TaskText";
import { TaskDelete } from "./TaskDelete";
import { useUpdateTask } from "@/hooks/tasks";

export default function TaskViewer({ context, setContext, isOpen, setIsOpen }) {
  const { mutate: updateTask } = useUpdateTask();
  const [isDeleting, setIsDeleting] = useState(false);

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
      onClose={() => {}}
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
          className="flex flex-col w-full bg-accent-black-900 text-accent-white shadow-inner shadow-accent-black-400 px-2 py-1 rounded-t-xl pb-8 items-center"
        >
          <div
            className={`inset-0 w-64 h-fit bg-accent-black-900 flex flex-col items-center p-4 rounded-t-xl`}
          >
            <div className={`${isDeleting && "blur-sm"} `}>
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
            </div>
            <div className="w-64 flex flex-row justify-left mt-6 gap-3">
              <div
                className={`flex grow justify-end ${isDeleting && "blur-sm"}`}
              >
                <button
                  onClick={() => closeMenu()}
                  className="w-full bg-blue-600 text-accent-white border border-accent-white px-1 py-1 rounded-md"
                >
                  Close
                </button>
              </div>
              <div className="flex grow justify-start">
                <TaskDelete
                  task={task}
                  closeMenu={closeMenu}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                />
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
