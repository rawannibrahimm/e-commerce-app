import ChangePassword from "@/components/profile/changePassword";
import UpdateInfo from "@/components/profile/updateInfo";

export default function Profile() {
    return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-5">
        <UpdateInfo/>
        <ChangePassword/>
    </div>
    </>
    )
}
