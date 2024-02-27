import { auth } from "@/auth.config";
import Title from "@/components/ui/title/Title";
import { redirect } from "../../../../node_modules/next/navigation";

const Profile = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <h3 className="text-5xl font-bold">{session.user.role}</h3>
    </div>
  );
};

export default Profile;
