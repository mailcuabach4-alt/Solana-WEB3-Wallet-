# Ví Solana Đơn Giản

Chào mừng bạn đến với Ví Solana Đơn Giản! Đây là một ứng dụng web được thiết kế để giúp bạn tương tác với mạng lưới Solana một cách dễ dàng, đặc biệt hữu ích cho các nhà phát triển, người thử nghiệm hoặc bất kỳ ai muốn tìm hiểu về cách hoạt động của ví blockchain.

**Quan trọng:** Ứng dụng này được tạo ra cho **mục đích học tập và phát triển**. Vui lòng đọc kỹ phần **Cảnh Báo Bảo Mật** trước khi sử dụng.

![Giao diện Ví Solana](https://ibb.co/mVQPdnFn)

## 🌟 Tính Năng Chính

- **Kết Nối An Toàn (Cho Ví Thử Nghiệm):** Kết nối bằng Khóa Riêng Tư (Private Key) của ví Solana.
- **Hỗ Trợ Nhiều Định Dạng Khóa:** Nhập khóa dưới dạng chuỗi `Base58` (phổ biến) hoặc `Mảng Byte`.
- **Quản Lý Số Dư:** Xem số dư SOL trong ví của bạn và làm mới bất cứ lúc nào.
- **Gửi SOL:** Thực hiện giao dịch chuyển SOL đến bất kỳ địa chỉ ví Solana nào khác.
- **Chuyển Đổi Mạng Linh Hoạt:** Dễ dàng chuyển đổi giữa các mạng `Devnet` (Mạng phát triển), `Testnet` (Mạng thử nghiệm), `Mainnet` (Mạng chính) và cả mạng `Local` (máy tính của bạn).
- **Hướng Dẫn Tích Hợp:** Có sẵn mục "Trợ giúp & Hướng dẫn" chi tiết ngay trong ứng dụng, giải thích mọi thứ bằng ngôn ngữ đơn giản.

---

## 🛑 CẢNH BÁO BẢO MẬT TUYỆT ĐỐI

**KHÓA RIÊNG TƯ LÀ TẤT CẢ TÀI SẢN CỦA BẠN.**

Hãy tưởng tượng Khóa Riêng Tư (Private Key) giống như chìa khóa và mã PIN của két sắt chứa toàn bộ tiền của bạn. Nếu bạn đưa nó cho ai đó hoặc nhập vào một nơi không an toàn, họ có thể lấy hết tài sản của bạn và không có cách nào lấy lại được.

- ⛔ **TUYỆT ĐỐI KHÔNG BAO GIỜ** sử dụng Khóa Riêng Tư của ví chính (ví bạn dùng để chứa tài sản thật) trong ứng dụng này hoặc bất kỳ trang web nào khác.
- ✅ **CHỈ NÊN SỬ DỤNG** Khóa Riêng Tư từ một **ví thử nghiệm** (còn gọi là "ví rác" hoặc "burner wallet"). Đây là những ví bạn tạo ra chỉ để thử nghiệm, không chứa tiền hoặc chỉ chứa một lượng tiền mã hóa không có giá trị (lấy từ các vòi phát token miễn phí trên mạng Devnet).

> *Cách tạo ví thử nghiệm an toàn đã được hướng dẫn chi tiết trong mục "Trợ giúp" bên trong ứng dụng.*

---

## 🚀 Hướng Dẫn Mở Ứng Dụng (Dành cho người mới bắt đầu)

Cách dễ nhất để chạy ứng dụng này là sử dụng trình soạn thảo mã nguồn **Visual Studio Code** và một tiện ích mở rộng miễn phí có tên là **Live Server**.

### Bước 1: Cài đặt Visual Studio Code (Nếu bạn chưa có)

1.  Truy cập trang web chính thức: [https://code.visualstudio.com/](https://code.visualstudio.com/)
2.  Tải xuống và cài đặt phiên bản phù hợp với máy tính của bạn (Windows, macOS, hoặc Linux).

### Bước 2: Cài đặt tiện ích "Live Server"

1.  Mở Visual Studio Code.
2.  Nhìn vào thanh công cụ bên trái, tìm và nhấp vào biểu tượng **Extensions** (trông giống như 4 ô vuông).
3.  Trong ô tìm kiếm, gõ `Live Server`.
4.  Tìm kết quả có tên "Live Server" của tác giả *Ritwick Dey* và nhấn nút **Install**.



### Bước 3: Mở Thư Mục Ứng Dụng

1.  Trong Visual Studio Code, vào menu `File` > `Open Folder...`
2.  Tìm và chọn thư mục chứa các tệp của ứng dụng này (thư mục có tệp `index.html`).

### Bước 4: Chạy Ứng Dụng!

1.  Sau khi đã mở thư mục, bạn sẽ thấy danh sách các tệp ở thanh bên trái.
2.  Tìm tệp `index.html`, **nhấp chuột phải** vào nó.
3.  Chọn tùy chọn **"Open with Live Server"**.



Ngay lập tức, trình duyệt web mặc định của bạn sẽ tự động mở ra và hiển thị ứng dụng Ví Solana. Giờ bạn đã sẵn sàng để sử dụng!

Chúc bạn có những trải nghiệm thú vị và học hỏi được nhiều điều!
