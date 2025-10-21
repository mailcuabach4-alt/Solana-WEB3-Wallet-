
import React, { useState } from 'react';

interface SendFormProps {
    onSend: (toAddress: string, amount: number) => void;
    loading: boolean;
    balance: number;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


export const SendForm: React.FC<SendFormProps> = ({ onSend, loading, balance }) => {
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (toAddress && numAmount > 0) {
            onSend(toAddress, numAmount);
        }
    };

    const isAmountInvalid = parseFloat(amount) > balance || parseFloat(amount) <= 0;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="toAddress" className="block text-sm font-medium text-gray-300 mb-1">
                    Địa chỉ người nhận
                </label>
                <input
                    id="toAddress"
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    placeholder="Địa chỉ ví Solana"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                    disabled={loading}
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                    Số lượng (SOL)
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    step="any"
                    min="0"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                    disabled={loading}
                />
                {amount && isAmountInvalid && <p className="text-red-400 text-xs mt-1">Số lượng không hợp lệ hoặc vượt quá số dư.</p>}
            </div>
            <button
                type="submit"
                disabled={loading || !toAddress || !amount || isAmountInvalid}
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang gửi...
                    </>
                ) : (
                    <>
                        <SendIcon /> Gửi
                    </>
                )}
            </button>
        </form>
    );
};
