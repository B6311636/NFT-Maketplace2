import { useAccount } from "@hooks/web3";
import { FunctionComponent } from "react";

const Walletbar: FunctionComponent = () => {
    const { account } = useAccount();
    return (
        <section className="mt-10 mb-4 text-white bg-indigo-600 rounded-lg">
            <div className="p-8">
                <h1 className="text-2xl">Hello, {account.data}</h1>
                <h2 className="subtitle mb-5 text-xl">I hope you are having a great day!</h2>
                <div className="flex justify-between items-center">

                </div>
            </div>
        </section>
    )
}

export default Walletbar;