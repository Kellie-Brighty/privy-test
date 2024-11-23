import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "./components/PrivyLoginButton";
import { useEffect, useState } from "react";
import { BaseError, parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { PrimaryButton } from "./components/Button";

export default function App() {
  const { authenticated, user } = usePrivy();
  const [_, setAuthInfo] = useState({} as any);
  const { address } = useAccount();
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const { switchChain, chains } = useSwitchChain();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({
      to,
      value: parseEther(value),
      gasPrice: parseEther("0.0009"),
    });
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (authenticated && user) {
      console.log("User info:::", user);
      setAuthInfo(user);
    } else setAuthInfo({});
  }, [authenticated, user]);

  return (
    <div>
      <div className={`w-full h-[100vh] flex justify-center items-center`}>
        <div
          className={`bg-[#333] p-[20px] rounded-[8px] text-[#ddd] space-y-[20px]`}
        >
          {authenticated && (
            <>
              <div>Connected wallet: {address}</div>
              {chains.map((chain) => (
                <PrimaryButton
                  key={chain.id}
                  onClick={() => switchChain({ chainId: chain.id })}
                  text={chain.name}
                />
              ))}
              <form onSubmit={submit}>
                <input name="address" placeholder="0xA0Cf…251e" required />
                <input name="value" placeholder="0.05" required />
                <button disabled={isPending} type="submit"></button>
                <PrimaryButton
                  text={isPending ? "Confirming..." : "Send"}
                  loading={isPending}
                  type="submit"
                />
                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && (
                  <div>
                    Error: {(error as BaseError).shortMessage || error.message}
                  </div>
                )}
              </form>
            </>
          )}
          <div className={`w-full flex justify-center`}>
            <LoginButton text="Login with Privy" />
          </div>
        </div>
      </div>
    </div>
  );
}
