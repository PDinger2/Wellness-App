import { ScreenPlaceholder } from "@/components/screen-placeholder";
import { userContext, userProvider} from "@/components/context/userContext";
import { useState, useEffect, useContext } from "react";
export default function ProfileScreen() {
  const { user } = useContext(userContext)
  return (
    <ScreenPlaceholder
      title="Profile"
      description={user?.email || "No email found"}    />
  );
}
