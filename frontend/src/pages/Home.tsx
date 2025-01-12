import { useUser } from "@/hooks/user";
import NameProvider from "./(Home)/NameProvider";
import { DaysAsNumbers, MonthsAsNumbers, getDateDD, getNameByDate, getNameByMonth, isOverdue, matchDate, withinWeek } from "@/utils/date";
import { useTasks } from "@/hooks/tasks";
import DueCapsule from "./(Home)/DueCapsule";
import { TaskItem } from "@/components/task/TaskItem";
import AuthProvider from "./Auth/AuthProvider";

const Home = () => {
    const user = useUser();
    const today = new Date();
    const tasks = useTasks();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Apply Server Logic for REST data '/metrics'

    const dueToday = tasks?.data?.filter((task) => matchDate(new Date(task.date), new Date()))
    const dueTomorrow = tasks?.data?.filter((task) => matchDate(new Date(task.date), tomorrow));

    const dueWeek = tasks?.data?.filter((task) => withinWeek(new Date(), new Date(task.date)));
    const overdueTasks = tasks?.data?.filter((task) => isOverdue(new Date(), new Date(task.date)));
    const sorted = Array.from(tasks?.data || []).filter(task => !task.done && new Date(task.date).getFullYear() > 2000).splice(0, 6);

    // if (user.isSuccess && !user?.data?.first)
    //     return <NameProvider />

    return (
        <AuthProvider>
            <div className="w-full h-full flex flex-col px-4 py-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-2xl">Hello <span className="text-accent-blue">{user?.data?.first}</span>!</span>
                    <span className="text-xl text-gray-500">{getNameByDate(today.getDay() as DaysAsNumbers)}, {getNameByMonth(today.getMonth() as MonthsAsNumbers)} {getDateDD(today)}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-xl">Your Agenda</span>
                    <div className="w-full flex flex-col h-64 gap-2">
                        <div className="w-full h-full flex flex-row justify-evenly gap-2">
                            <DueCapsule count={dueToday?.length} category="Due Today" important />
                            <div className="w-full h-full flex flex-col justify-evenly gap-2">
                                <DueCapsule count={dueTomorrow?.length} category="Due Tomorrow" />
                                <DueCapsule count={dueWeek?.length} category="Due This Week" />
                            </div>
                        </div>
                        <div className="w-full h-16 flex shadow-md border border-accent-blue/80 rounded-md px-4 py-2 items-center justify-between">
                            <span className="text-xl text-gray-500">Overdue Tasks</span>
                            <span className="text-red-500 text-3xl">{overdueTasks?.length}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2 pb-24">
                    <span className="text-xl">Upcoming Tasks</span>
                    <ul className="w-full flex flex-col">
                        {sorted.map((task, key) => {
                            return (
                                <li key={key} className="w-full h-full">
                                    <TaskItem item={task} taskFilter="all" />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </AuthProvider>
    )

};

export default Home;