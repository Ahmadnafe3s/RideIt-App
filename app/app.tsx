import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function App() {
  const { isLoaded, isSignedIn} = useAuth();

  // Wait until Clerk has loaded
  if (!isLoaded) return null; // or a loading indicator

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
