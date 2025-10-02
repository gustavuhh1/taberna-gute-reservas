import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";


const ProfilePage = () => {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex flex-col space-y-5">
      <h1>Perfil</h1>
      <Avatar>
        <AvatarImage src={session?.user?.image as string | undefined} />
        <AvatarFallback>
          {session?.user?.name ? session.user.name.split(" ")[0]?.[0]?.toUpperCase() : ""}
          {session?.user?.name ? session.user.name.split(" ")[1]?.[0]?.toUpperCase() : ""}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ProfilePage;