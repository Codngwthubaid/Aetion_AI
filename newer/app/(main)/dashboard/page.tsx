import CreateOptions from "./_components/create-options";
import LatestInterviewList from "./_components/latest-interview-list";
import UserDetailsHeader from "./_components/user-details-header";


export default function Dashboard() {

    return (
        <h1>
            {/* <UserDetailsHeader /> */}
            <h2 className="font-bold text-2xl my-6 text-emerald-500">Dashboard</h2>
            <CreateOptions />
            <LatestInterviewList />
        </h1>
    )
}