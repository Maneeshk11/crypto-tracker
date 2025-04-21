import DiscoverWalletProviders from "@/components/DiscoverWalletProviders";

import { User } from "lucide-react";
import NetworkSelect from "./NetworkSelect";
import Tokens from "./Tokens";
const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium flex items-center gap-2">
        <User className="" /> Profile
      </span>

      <div className="flex flex-col gap-4">
        <DiscoverWalletProviders />
        <NetworkSelect />
        <Tokens />
      </div>
    </div>
  );
};

export default ProfilePage;
