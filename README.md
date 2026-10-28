# Trường Mầm non BiBi Thiên Nga - STEAM Preschool (Đà Nẵng)

> **Website chính thức và Cổng Quản trị Trực quan** dành cho Trường Mầm non BiBi Thiên Nga STEAM Preschool tại Quận Cẩm Lệ, Thành phố Đà Nẵng.

![BiBi Thien Nga Steam Preschool](https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80)

---

## 📌 Thông Tin Trường Mầm Non

- **Tên trường:** Trường Mầm non BiBi Thiên Nga Steam Preschool
- **Địa chỉ:** 37 Phan Văn Trị, Phường Khuê Trung, Quận Cẩm Lệ, TP. Đà Nẵng
- **Hotline Tuyển sinh:** [0707.609.131](tel:0707609131)
- **Email:** bibithiennga.preschool@gmail.com
- **Độ tuổi nhận trẻ:** Từ 6 tháng đến 5 tuổi (các khối lớp chuyên biệt theo chuẩn STEAM)
- **Thời gian hoạt động:** Thứ Hai đến thứ Bảy (6:30 – 18:00) · Nghỉ Chủ Nhật
- **Phương pháp giáo dục:** STEAM tích hợp chuẩn quốc tế (Khoa học, Công nghệ, Kỹ thuật, Nghệ thuật, Toán học)

---

## 🚀 Tính Năng Chính

### 1. Website Phụ Huynh (Public Portal)
- 🌿 **Giao diện chuẩn mầm non:** Tone màu xanh lá cây sinh thái tươi mát, ấm áp, thân thiện và tối ưu mọi kích thước màn hình (Mobile, Tablet, Desktop).
- 📢 **Dải thông báo ưu đãi đầu trang:** Cập nhật học bổng, ưu đãi tuyển sinh mới nhất (có thể bật/tắt trong Admin).
- 🔬 **5 Khối lớp STEAM chuyên biệt:** Thông tin độ tuổi, sĩ số, học phí niêm yết và nút đăng ký nhanh.
- 🍲 **Thực đơn tuần 5 bữa/ngày:** Tương tác chuyển đổi ngày trong tuần (Thứ Hai - Thứ Bảy), hiển thị calo, thực phẩm VietGAP và lưu ý dị ứng.
- 👩‍🏫 **Đội ngũ giáo viên:** Trình độ sư phạm mầm non, chứng chỉ STEAM quốc tế, chứng chỉ sơ cấp cứu.
- 🏫 **Cơ sở vật chất:** Xưởng STEAM Lab, sân chơi cát cỏ tự nhiên 300m², bếp ăn một chiều HACCP, camera phụ huynh trực tuyến 24/7.
- 📸 **Thư viện hình ảnh:** Xem ảnh học tập, dã ngoại theo danh mục kèm Lightbox phóng to.
- 📰 **Tin tức & Cẩm nang:** Thông báo tuyển sinh và bài viết nuôi dạy con khoa học.
- 💬 **Đánh giá phụ huynh:** Lời nhận xét chân thực từ phụ huynh và form gửi cảm nghĩ trực tiếp.
- 📝 **Đăng ký tham quan trực tuyến:** Biểu mẫu kiểm tra số điện thoại Việt Nam chuẩn xác, gửi ngay về trang Quản trị.

### 2. Cổng Quản Trị Hệ Thống (Admin Control Panel)
- **Bảo mật truy cập:** Mã PIN quản trị (`1234` hoặc nút *Đăng nhập nhanh 1 chạm*).
- **Thêm - Sửa - Xóa (Full CRUD):**
  - Quản lý Hồ sơ Tuyển sinh (Chuyển trạng thái, ghi chú nhân viên, lọc, tìm kiếm).
  - Quản lý Thông tin Trường (Tên trường, hotline, địa chỉ, giờ giấc, banner ưu đãi).
  - Quản lý Khối Lớp & Học phí.
  - Quản lý Thực Đơn Tuần theo từng ngày.
  - Quản lý Giáo Viên & Bằng cấp.
  - Quản lý Bài viết Tin Tức & Hoạt động.
  - Quản lý Thư viện Hình ảnh.
  - Duyệt/Ẩn Đánh giá của Phụ huynh.
  - **Sao lưu & Khôi phục:** Xuất file JSON, nhập JSON và đặt lại dữ liệu gốc chuẩn.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Node.js native test runner (`tsx --test`)
- **Hosting Ready:** Tối ưu sẵn cho [Vercel](https://vercel.com/) và [GitHub](https://github.com/)

---

## 💻 Cài Đặt & Chạy Dưới Local

### 1. Yêu cầu hệ thống
- Node.js version 18.0.0 trở lên
- Trình quản lý gói `npm`, `yarn` hoặc `pnpm`

### 2. Các bước khởi chạy
```bash
# 1. Clone repository về máy
git clone <URL_REPOSITORY_CUA_BAN>
cd bibi-thien-nga-preschool

# 2. Cài đặt thư viện dependencies
npm install

# 3. Chạy môi trường phát triển (Development)
npm run dev

# 4. Kiểm tra unit test logic
npm test

# 5. Build kiểm tra bản Production
npm run build
```

Mở trình duyệt tại: `http://localhost:3000`

---

## 📤 Hướng Dẫn Đẩy Mã Nguồn Lên GitHub

Nếu bạn đã có tài khoản GitHub:

1. Vào [GitHub](https://github.com) và tạo một Repository mới (ví dụ đặt tên: `bibi-thien-nga-preschool`).
2. Mở terminal tại thư mục dự án và chạy các lệnh sau:

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả tệp vào git
git add .

# Tạo commit đầu tiên
git commit -m "fix: resolve esbuild peer dependency conflict for vercel deployment"

# Đổi nhánh chính thành main
git branch -M main

# Liên kết với repository GitHub của bạn (nếu chưa liên kết)
git remote add origin https://github.com/nguyentrongliem22/bibithiennga2.git

# Đẩy code lên GitHub
git push -u origin main
```

---

## ☁️ Hướng Dẫn Triển Khai (Deploy) Lên Vercel

Dự án đã được tạo sẵn tệp cấu hình chuẩn `vercel.json` định tuyến SPA và cấu hình build `dist`.

### Cách 1: Triển khai qua Giao diện Vercel (Khuyên dùng)
1. Đăng nhập vào [Vercel](https://vercel.com) (bằng tài khoản GitHub).
2. Nhấn nút **"Add New..."** ➔ chọn **"Project"**.
3. Chọn Repository `bibi-thien-nga-preschool` vừa đẩy lên GitHub và nhấn **"Import"**.
4. Cấu hình triển khai (Vercel sẽ tự động nhận diện từ `vercel.json`):
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Nhấn **"Deploy"**. Trong vòng chưa đầy 1 phút, trang web của trường sẽ chính thức hoạt động trên toàn cầu với địa chỉ HTTPS miễn phí dạng `https://bibi-thien-nga-preschool.vercel.app`.

### Cách 2: Triển khai qua Vercel CLI
```bash
# Đăng nhập và deploy trực tiếp từ terminal
npx vercel

# Triển khai production
npx vercel --prod
```

---

## 🔑 Tài Khoản Quản Trị Hệ Thống (Admin)

- Để truy cập Cổng Quản Trị, nhấn nút **"Quản trị viên"** ở góc phải thanh điều hướng hoặc nút biểu tượng tròn nổi bên dưới góc phải.
- **Mã PIN mặc định:** `1234`
- Hoặc bấm nút **"Đăng nhập nhanh 1 chạm"** trên màn hình đăng nhập.
- Mọi dữ liệu sửa đổi đều được lưu an toàn trong trình duyệt (`localStorage`) và có thể tải về file sao lưu JSON bất cứ lúc nào.

---

## 📄 Bản Quyền & Giấy Phép

Dự án phát triển cho **Trường Mầm non BiBi Thiên Nga STEAM Preschool** (37 Phan Văn Trị, Phường Khuê Trung, Quận Cẩm Lệ, TP. Đà Nẵng).
Mã nguồn phát hành theo giấy phép [Apache-2.0](LICENSE).
