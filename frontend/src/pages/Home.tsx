import { useUser } from "@/hooks/user";
import NameProvider from "./(Home)/NameProvider";

const Home = () => {
    const user = useUser().data;

    console.log(user);

    if(!user?.first)
        return <NameProvider />

    return <div>
        <div>
            <span></span>
        </div>
    </div>
};

export default Home;