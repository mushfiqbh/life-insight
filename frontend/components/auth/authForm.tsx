import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  onLogin: boolean;
  setOnLogin: (b: boolean) => void;
  formState: { name: string; email: string; password: string };
  setFormState: Dispatch<
    SetStateAction<{ name: string; email: string; password: string }>
  >;
  handleSubmit: (e: React.FormEvent) => void;
  message: string;
}

const AuthForm: React.FC<Props> = ({
  onLogin,
  setOnLogin,
  formState,
  setFormState,
  handleSubmit,
  message,
}) => {
  return (
    <div>
      <div className="flex justify-around mb-4">
        <button onClick={() => setOnLogin(true)}>Login</button>
        <button onClick={() => setOnLogin(false)}>Register</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!onLogin && (
          <input
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        {message && <p className="text-red-500">{message}</p>}
        <Button type="submit">{onLogin ? "Login" : "Register"}</Button>
      </form>
    </div>
  );
};

export default AuthForm;
