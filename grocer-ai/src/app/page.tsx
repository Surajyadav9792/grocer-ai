import { auth } from "@/auth";
import { EditRoleAndMobile } from "@/component/EditRoleAndMobile";
import Welcome from "@/component/Welcome";
import User from "@/models/user.model";
import connectDb from "@/utils/db";
import { redirect } from "next/navigation";

async function Home() {
  await connectDb();
  const session = await auth()
  const user=await User.findById(session?.user?.id)
  if(!user){
     redirect("/login");
  }
  const incommplete=!user.mobile || !user.role || (!user.mobile && user.role==="user") //check user existe
  if(incommplete){
   return <EditRoleAndMobile />
  }
  return (
    <div>
     <Welcome/>
    </div>
  );
}
export default Home;
  