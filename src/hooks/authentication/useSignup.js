import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from user's email address.",
      );
    },
    onError: (err) => {
      console.error("SIGNUP ERROR:", err);
      toast.error(err.message);
    },
  });
  return { signup, isSigningUp };
}
