import { supabase } from "@/lib/supabase";

const handleGoogleLogin = async () => {
try{ const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
});


  if (error) console.error("Google Login Error:", error);}catch(err){console.log(err)}
};
<button onClick={handleGoogleLogin}>
  Continue with Google
</button>
