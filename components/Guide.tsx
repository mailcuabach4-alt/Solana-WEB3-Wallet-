import React from 'react';

interface GuideProps {
    isOpen: boolean;
}

export const Guide: React.FC<GuideProps> = ({ isOpen }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-4 text-gray-300 animate-fade-in text-base">
            <h2 className="text-xl font-bold text-purple-400">Chào mừng bạn đến với Ví Solana!</h2>
            <p>Hướng dẫn này sẽ giúp bạn hiểu và sử dụng ví này một cách an toàn, ngay cả khi bạn chưa biết gì về công nghệ.</p>

            <div className="space-y-3 pt-3">
                <h3 className="text-lg font-semibold text-gray-100">Những khái niệm cơ bản</h3>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li>
                        <strong>Ví Solana là gì?</strong> Hãy tưởng tượng nó như một chiếc ví thật, nhưng dùng để chứa tiền kỹ thuật số có tên là "SOL" trên mạng lưới Solana.
                    </li>
                    <li>
                        <strong>Địa chỉ ví (Public Key):</strong> Giống như số tài khoản ngân hàng của bạn. Bạn có thể chia sẻ nó cho người khác để họ gửi tiền cho bạn.
                    </li>
                    <li>
                        <strong className="text-yellow-400">Khóa Riêng Tư (Private Key):</strong> Đây là thứ <span className="font-extrabold uppercase">quan trọng nhất</span>. Nó giống như mật khẩu và mã PIN của tài khoản ngân hàng của bạn. <strong className="text-red-400 uppercase">KHÔNG BAO GIỜ chia sẻ nó với bất kỳ ai!</strong> Ai có khóa này, người đó có toàn quyền kiểm soát ví của bạn.
                    </li>
                </ul>
            </div>

            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mt-4">
                <h4 className="font-bold">CẢNH BÁO BẢO MẬT TUYỆT ĐỐI</h4>
                <p className="text-sm">Ứng dụng này được tạo ra cho mục đích <strong className="uppercase">phát triển và thử nghiệm</strong>. Vui lòng <strong className="uppercase">KHÔNG BAO GIỜ</strong> sử dụng khóa riêng tư từ ví chính của bạn ở đây. Hãy luôn tạo một ví mới, không có tiền hoặc chỉ có một ít tiền thử nghiệm để sử dụng.</p>
            </div>
            
            <div className="space-y-3 pt-3">
                <h3 className="text-lg font-semibold text-gray-100">Làm thế nào để có một Khóa Riêng Tư an toàn để thử nghiệm?</h3>
                 <p className="text-sm">Cách dễ nhất là tạo một "tài khoản phụ" trong một ví uy tín như Phantom hoặc Solflare.</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                     <li>Cài đặt ví Phantom (hoặc ví Solana khác) làm tiện ích mở rộng trên trình duyệt của bạn.</li>
                     <li>Trong ví Phantom, vào phần cài đặt và chọn "Thêm / Kết nối ví", sau đó chọn "Tạo ví mới".</li>
                     <li>Sau khi tạo xong ví phụ mới này, hãy vào cài đặt của tài khoản đó và tìm tùy chọn "Export Private Key" (Xuất khóa riêng tư).</li>
                     <li>Sao chép chuỗi ký tự đó. Đây chính là khóa riêng tư (định dạng Base58) bạn sẽ dán vào ứng dụng này.</li>
                </ol>
            </div>

            <div className="space-y-3 pt-3">
                <h3 className="text-lg font-semibold text-gray-100">Hướng dẫn sử dụng</h3>
                <dl className="space-y-3">
                    <div>
                        <dt className="font-semibold text-gray-200">Bước 1: Kết nối Ví</dt>
                        <dd className="pl-4 text-gray-400">
                            Chọn định dạng "Base58" (đây là định dạng bạn nhận được khi xuất từ ví Phantom). Dán khóa riêng tư của ví <strong className="uppercase">thử nghiệm</strong> bạn vừa tạo vào ô "Giá Trị Khóa", sau đó nhấn nút "Kết nối Ví".
                        </dd>
                    </div>
                     <div>
                        <dt className="font-semibold text-gray-200">Bước 2: Xem thông tin</dt>
                        <dd className="pl-4 text-gray-400">
                           Sau khi kết nối, bạn sẽ thấy "Địa chỉ" ví và "Số dư" SOL của mình. Bạn có thể nhấn nút làm mới (hình mũi tên xoay tròn) để cập nhật số dư.
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-200">Bước 3: Gửi SOL</dt>
                        <dd className="pl-4 text-gray-400">
                           Trong mục "Gửi SOL", nhập địa chỉ ví của người nhận và số lượng SOL bạn muốn gửi, sau đó nhấn "Gửi".
                        </dd>
                    </div>
                     <div>
                        <dt className="font-semibold text-gray-200">Bước 4: Chuyển Mạng</dt>
                        <dd className="pl-4 text-gray-400">
                           Bạn có thể chuyển đổi giữa các mạng. "Devnet" là mạng thử nghiệm nơi bạn có thể nhận SOL miễn phí để test. "Mainnet" là mạng chính với tiền thật (hãy cẩn thận!). "Local" dùng để kết nối với mạng Solana chạy trên máy tính của bạn.
                        </dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-200">Bước 5: Ngắt kết nối</dt>
                        <dd className="pl-4 text-gray-400">
                           Khi dùng xong, hãy nhấn "Ngắt kết nối" để thoát khỏi ví.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};
