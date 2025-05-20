import CreateOptions from "./_components/create-options";
import LatestInterviewList from "./_components/latest-interview-list";
import UserDetailsHeader from "./_components/user-details-header";


export default function Dashboard() {

    return (
        <h1>
            {/* <UserDetailsHeader /> */}
            <div className="font-bold text-2xl my-6 text-emerald-500">Dashboard</div>
            <CreateOptions />
            <LatestInterviewList />
        </h1>
    )
}