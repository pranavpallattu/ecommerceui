import { IndianRupee } from "lucide-react";

const WalletBalanceCard = ({ balance }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,white_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative z-10 text-center">
        <p className="text-lg lg:text-xl font-medium opacity-90 mb-3">
          Wallet Balance
        </p>

        <div className="flex items-center justify-center gap-4">
          <IndianRupee size={56} className="opacity-90" />
          <h1 className="text-6xl lg:text-8xl font-black tracking-tight">
            {balance?.toLocaleString("en-IN") || "0"}
          </h1>
        </div>

        <p className="text-sm lg:text-base opacity-80 mt-4">
          Updated • {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
