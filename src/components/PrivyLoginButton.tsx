import { usePrivy } from "@privy-io/react-auth";

interface PrivyAuthButtonProps {
  text: string;
}

export default function LoginButton({ text }: PrivyAuthButtonProps) {
  const { ready, authenticated, login, logout } = usePrivy();

  return (
    <button
      className={`bg-[#000] text-white p-[10px] w-full rounded-[8px] font-[700] ${
        !ready && `bg-[#ccc] cursor-not-allowed`
      }`}
      disabled={!ready}
      onClick={authenticated ? logout : login}
      style={{ minWidth: "200px" }} // Added minWidth for better mobile display
    >
      {authenticated ? "Logout" : text}
    </button>
  );
}
