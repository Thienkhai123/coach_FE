# Cấu trúc thư mục

public:

- images: chứa tài nguyên ảnh, video,...
- lang: chứa file json đa ngôn ngữ
  src:
- apis: httpRequest
- app: chứa đường dẫn trang, giao diện
- components: chứa components và presentation dùng để reuse UI
- configs: chứa thiết lập đường dẫn gọi API
- constant: chứa các biến constant: tên localstorage, regex,...
- container: chứa container cho từng trang, dùng để init data, xử lý logic trước khi truyền data vào components
- helpers: chứa các function helpers dùng để format dữ liệu đầu ra (ngày, giờ, ký tự, số)
- hook: dùng để reuse cho các state dùng lại nhiều lần
- interfaces: khai báo các interface
- lang: khai báo biến dịch đa ngôn ngữ
- layout: HOC bọc bên ngoài trang để tiền xử lý global data hoặc protect routes
  các file khác:
- package.json: thông tin dự án, package và cú pháp để chạy/deploy dự án

# Site map dự án

1. Trang chủ: /
2. Tin tức: /tin-tuc
3. Bài viết: /bai-viet?slug=
4. Đăng nhập: /dang-nhap
5. Đăng ký: /dang-ky
6. Đăng xuất: /dang-xuat
7. Quên mật khẩu: /quen-mat-khau
8. Đặt vé: /dat-ve
9. Tạo đơn hàng: /gui-hang
10. Tra cứu đơn: tra-cuu-don-hang
11. Thuê xe hợp đồng: /xe-hop-dong
12. Trạng thái thanh toán: /cho-xac-nhan-thanh-toan
13. Lịch sử dịch vụ: /lich-su-dich-vu
14. Điểm của tôi: /diem-thuong-cua-toi

# Các lệnh chạy dự án

Build thư mục caches và các gói bundles

```
yarn build
```

Chạy project ở môi trường dev (localhost)

```
yarn dev
```

Chạy sau khi thực thi lệnh "yarn build" để chạy project ở môi trường production (localhost)

```
yarn start
```

Deploy project lên server iis (cần username và password)

```
yarn dev
```

# Hướng dẫn thiết lập Đa ngôn ngữ

1. Tạo thư mục và file .json tương ứng ở thư mục "public/lang"
2. Import file .json khởi tạo ở trên vào thư mục ngôn ngữ tương ứng ở "src/lang", sau đó export ra dạng Object
3. Import các Object trên vào hook "useTrans"
4. Import hook useTrans() kèm interface tương ứng để sử dụng

# Hướng dẫn sử dụng thông báo custom:

- Import hook useCustomToast() có trả về 2 function để trả thông báo thành công/lỗi
- Có thể custom thông báo phù hợp từng dự án ở hook này

# Sử dụng HOC để Protect Route:

### Cách dùng: Bọc bên ngoài trang cần Protect Route

1. withAuth: chỉ cho phép user đã đăng nhập và token còn thời hạn được phép truy cập

```
export default withAuth(Page)
```

2. withGuest: chỉ cho phép user chưa đăng nhập được phép truy cập

```
export default withGuest(Page)
```

3. withCommon: cho phép user đăng nhập và đăng nhập đều có thể truy cập

```
export default withCommon(Page)
```

# Flow triển khai API cần note

### Flow đăng ký (Payload có sẵn trong interface)

1. Call api /verify-register để xác thực số điện thoại và nhận OTP về điện thoại
2. Nhập OTP (chưa tích hợp gửi OTP) nên sẽ mặc định gửi otp là 1234
3. Call api /register để đăng ký
4. Hiện tại đăng ký thành công hiện popup -> call api đăng nhập -> redirect về trang chủ

### Flow quên mật khẩu (Payload có sẵn trong interface)

- Tương tự flow đăng ký cần call api /forget-password-verify để xác thực số điện thoại và gửi OTP

### Map data SearchRoute

- Thông tin chuyến đi ưu tiên lấy từ trips[0] trước,không có mới lấy từ tripRoutes[0].trip
- Ưu tiên cái trip.startPlace/endPlace trước, nếu không có route thì dùng routeSubRoutes
- Địa điểm bắt đầu: routeSubRoutes.first().subRoute.startPlace.name
- Địa điểm kết thúc: routeSubRoutes.last().subRoute.endPlace.name
- Chỗ trống: trip[0].vehicle.vehicleType.totalSeats - trip[0].ticketCount

Sau khi chọn chuyến => lấy được tripId,routeId
-Trip/ReservationStart : {tripId: ... , routeId:....} => response có ticketBatchId

-Trip/ReservationValidateSeats: {ticketBatchId: <lấy ở trên>, seats: <string, kiểu "A1,B2", lấy seat.name của trip.vehicle.vehicleType.seatSetup...>}

- Map chỗ ngồi
  {
  "seats": [
  ],
  "totalDecks": 2, // số tầng
  "seatPerRow": 3, // số ghế trên 1 hàng
  "firstRowSeats": 3, // số ghế hàng đầu
  "lastRowSeats": 4, // số ghế hàng cuối
  "letters": "A,B,C"
  }

-API GET_TRIP_RESERVED_SEATS để Get danh sách ghế đã đặt => disable
