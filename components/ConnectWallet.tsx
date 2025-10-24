import React, { useState } from 'react';

interface ConnectWalletProps {
    onConnect: (privateKey: string, format: 'base58' | 'byteArray') => void;
    loading: boolean;
}

const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 6a1 1 0 011-1h1a1 1 0 010 2H5a1 1 0 01-1-1zm1 3a1 1 0 100 2h1a1 1 0 100-2H5zm2 2a1 1 0 011-1h1a1 1 0 010 2H8a1 1 0 01-1-1zm3 1a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
        <path d="M10 5a1 1 0 00-1 1v1a1 1 0 002 0V6a1 1 0 00-1-1zM8 9a1 1 0 011-1h1a1 1 0 010 2H9a1 1 0 01-1-1zM5 13a1 1 0 100 2h1a1 1 0 100-2H5zm3 1a1 1 0 011-1h1a1 1 0 010 2H9a1 1 0 01-1-1z" />
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
);


export const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect, loading }) => {
    const [privateKey, setPrivateKey] = useState('');
    const [format, setFormat] = useState<'base58' | 'byteArray'>('base58');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (privateKey.trim()) {
            onConnect(privateKey.trim(), format);
        }
    };

    const handleFormatChange = (newFormat: 'base58' | 'byteArray') => {
        setFormat(newFormat);
        setPrivateKey(''); // Xóa đầu vào khi thay đổi định dạng
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Định Dạng Khóa Riêng Tư
                    </label>
                    <div className="flex items-center gap-1 p-1 bg-gray-900 rounded-lg">
                         <button type="button" onClick={() => handleFormatChange('base58')} className={`w-full py-1.5 text-sm rounded-md transition-colors ${format === 'base58' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`} disabled={loading}>Base58</button>
                         <button type="button" onClick={() => handleFormatChange('byteArray')} className={`w-full py-1.5 text-sm rounded-md transition-colors ${format === 'byteArray' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`} disabled={loading}>Mảng Byte</button>
                    </div>
                </div>

                <div>
                    <label htmlFor="private-key" className="block text-sm font-medium text-gray-300 mb-2">
                        Giá Trị Khóa
                    </label>
                     {format === 'base58' ? (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               <KeyIcon className="text-gray-400" />
                            </div>
                            <input
                                id="private-key"
                                type="password"
                                value={privateKey}
                                onChange={(e) => setPrivateKey(e.target.value)}
                                placeholder="Nhập khóa riêng tư base58 của bạn"
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition"
                                disabled={loading}
                            />
                        </div>
                     ) : (
                         <textarea
                            id="private-key-array"
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            placeholder="Dán mảng byte của bạn, ví dụ: [191, 16, 101, ...]"
                            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition font-mono text-sm h-28 resize-y"
                            disabled={loading}
                        />
                     )}
                </div>

                <button
                    type="submit"
                    disabled={loading || !privateKey}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang kết nối...
                        </>
                    ) : 'Kết nối Ví'}
                </button>
            </form>
        </div>
    );
};