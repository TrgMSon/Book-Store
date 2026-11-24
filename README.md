# Book Store

Web bán sách. Ứng dụng hỗ trợ khách hàng tìm hiểu và mua sách trực tuyến, đồng thời cung cấp giao diện quản trị để quản lý sách và theo dõi hóa đơn.

## Chức năng chính

### Khách hàng

- Đăng ký, đăng nhập và đăng xuất.
- Xem danh sách sách, tìm kiếm sách và xem thông tin chi tiết.
- Thêm sách vào giỏ hàng, cập nhật số lượng và xóa sách khỏi giỏ.
- Nhập thông tin khách hàng và thanh toán giỏ hàng.

### Quản trị viên

- Quản lý danh sách sách: thêm, cập nhật, tìm kiếm và xóa.
- Tải ảnh sách lên Cloudinary.
- Xem hóa đơn và chi tiết hóa đơn, tra cứu thông tin giảm giá.
- Theo dõi doanh thu theo tháng và theo năm.

## Công nghệ sử dụng

- Java 21, Spring Boot 3.5
- Spring MVC, Thymeleaf và Spring Data JPA
- TiDB (TiDB Cloud hoặc TiDB Serverless)
- Cloudinary để lưu trữ ảnh sách
- Maven để quản lý và xây dựng dự án

## Yêu cầu

- JDK 21
- TiDB Cloud/Serverless hoặc TiDB tương thích MySQL
- Tài khoản Cloudinary

## Cấu hình

Ứng dụng cần kết nối đến cơ sở dữ liệu TiDB và Cloudinary. TiDB tương thích giao thức MySQL, nên dự án sử dụng MySQL Connector/J để kết nối.

Sao chép `.env.example` thành `.env` ở thư mục gốc, sau đó điền thông tin kết nối từ TiDB Console hoặc thiết lập các biến môi trường tương ứng:

```dotenv
DB_URL=your_tidb_url
DB_USERNAME=your_tidb_username
DB_PASSWORD=your_tidb_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Thay `gateway01.us-east-1.prod.aws.tidbcloud.com` bằng hostname public endpoint của cluster TiDB, và thay `bookstore` bằng tên database. Khi chạy ứng dụng trên máy local hoặc nền tảng triển khai, cần cấp quyền truy cập mạng/Allowlist địa chỉ IP theo cấu hình của cluster TiDB.

Tạo cơ sở dữ liệu và cấu trúc bảng trên TiDB trước khi chạy ứng dụng. Cấu hình JPA hiện không tự tạo hoặc cập nhật bảng (`spring.jpa.hibernate.ddl-auto=none`).

## Chạy ứng dụng

Trên Windows, từ thư mục gốc của dự án, chạy:

```powershell
.\mvnw.cmd spring-boot:run
```

Ứng dụng mặc định chạy tại [http://localhost:8080](http://localhost:8080). Trang chủ có thể truy cập tại `/` hoặc `/home`.

Để đóng gói ứng dụng thành file JAR:

```powershell
.\mvnw.cmd clean package
```

## Cấu trúc dự án

- `src/main/java/com/example/bookstore/controller`: xử lý trang web và API.
- `src/main/java/com/example/bookstore/service`: xử lý nghiệp vụ.
- `src/main/java/com/example/bookstore/repository`: truy cập dữ liệu.
- `src/main/java/com/example/bookstore/model`: các thực thể dữ liệu.
- `src/main/resources/templates`: giao diện Thymeleaf.
- `src/main/resources/static`: JavaScript và CSS.
