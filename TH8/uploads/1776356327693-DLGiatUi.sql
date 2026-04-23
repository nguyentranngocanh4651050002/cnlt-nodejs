CREATE DATABASE QuanLyGiatUi
GO

USE QuanLyGiatUi
GO

-- ================================================
-- HỆ THỐNG CƠ SỞ DỮ LIỆU - QUẢN LÝ TIỆM GIẶT ỦI
-- ================================================

-- 1. BẢNG KHÁCH HÀNG
CREATE TABLE KhachHang (
    MaKH INT AUTO_INCREMENT PRIMARY KEY,
    HoTen VARCHAR(100),
    SoDienThoai VARCHAR(15),
    DiaChi VARCHAR(255),
    GhiChu TEXT
);

-- 2. BẢNG LOẠI ĐỒ GIẶT
CREATE TABLE LoaiDo (
    MaLoaiDo INT AUTO_INCREMENT PRIMARY KEY,
    TenLoaiDo VARCHAR(100),
    DonGia DECIMAL(10,2),
    GhiChu TEXT
);

-- 3. BẢNG KHUYẾN MÃI
CREATE TABLE KhuyenMai (
    MaKhuyenMai INT AUTO_INCREMENT PRIMARY KEY,
    TenKhuyenMai VARCHAR(100),
    MoTa TEXT,
    PhanTramGiam INT CHECK (PhanTramGiam BETWEEN 0 AND 100),
    NgayBatDau DATE,
    NgayKetThuc DATE
);

-- 4. BẢNG ĐƠN GIẶT
CREATE TABLE DonGiat (
    MaDon INT AUTO_INCREMENT PRIMARY KEY,
    MaKH INT,
    NgayNhan DATE,
    NgayTra DATE,
    TinhTrang VARCHAR(50),
    TongTien DECIMAL(10,2),
    MaKhuyenMai INT,
    GhiChu TEXT,
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaKhuyenMai) REFERENCES KhuyenMai(MaKhuyenMai)
);

-- 5. BẢNG CHI TIẾT ĐƠN GIẶT
CREATE TABLE ChiTietDon (
    MaDon INT,
    MaLoaiDo INT,
    SoLuong INT,
    DonGia DECIMAL(10,2),
    ThanhTien DECIMAL(10,2) GENERATED ALWAYS AS (SoLuong * DonGia) STORED,
    PRIMARY KEY (MaDon, MaLoaiDo),
    FOREIGN KEY (MaDon) REFERENCES DonGiat(MaDon),
    FOREIGN KEY (MaLoaiDo) REFERENCES LoaiDo(MaLoaiDo)
);

-- 6. BẢNG THANH TOÁN
CREATE TABLE ThanhToan (
    MaThanhToan INT AUTO_INCREMENT PRIMARY KEY,
    MaDon INT,
    NgayThanhToan DATE,
    SoTienThanhToan DECIMAL(10,2),
    PhuongThuc VARCHAR(50),
    GhiChu TEXT,
    FOREIGN KEY (MaDon) REFERENCES DonGiat(MaDon)
);

-- 7. BẢNG NHÂN VIÊN
CREATE TABLE NhanVien (
    MaNV INT AUTO_INCREMENT PRIMARY KEY,
    HoTen VARCHAR(100),
    ChucVu VARCHAR(50),
    SoDienThoai VARCHAR(15),
    TrangThaiLamViec VARCHAR(50)
);

-- 8. BẢNG TÀI KHOẢN ĐĂNG NHẬP
CREATE TABLE TaiKhoan (
    TenDangNhap VARCHAR(50) PRIMARY KEY,
    MatKhau VARCHAR(255),
    VaiTro VARCHAR(20),
    MaNV INT,
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);

-- 9. BẢNG MÁY GIẶT
CREATE TABLE MayGiat (
    MaMay INT AUTO_INCREMENT PRIMARY KEY,
    TenMay VARCHAR(100),
    TrangThai VARCHAR(50),
    LoaiMay VARCHAR(50),
    GhiChu TEXT
);

-- 10. BẢNG PHÂN CÔNG MÁY GIẶT
CREATE TABLE PhanCongMay (
    MaDon INT,
    MaMay INT,
    NgayBatDau DATETIME,
    NgayKetThuc DATETIME,
    GhiChu TEXT,
    PRIMARY KEY (MaDon, MaMay),
    FOREIGN KEY (MaDon) REFERENCES DonGiat(MaDon),
    FOREIGN KEY (MaMay) REFERENCES MayGiat(MaMay)
);

-- 11. BẢNG CÔNG ĐOẠN
CREATE TABLE CongDoan (
    MaCongDoan INT AUTO_INCREMENT PRIMARY KEY,
    TenCongDoan VARCHAR(100),
    MoTa TEXT
);

-- 12. BẢNG XỬ LÝ CÔNG ĐOẠN
CREATE TABLE XuLyCongDoan (
    MaXuLy INT AUTO_INCREMENT PRIMARY KEY,
    MaDon INT,
    MaCongDoan INT,
    MaMay INT,
    MaNV INT,
    TrangThai VARCHAR(50),
    ThoiGianBatDau DATETIME,
    ThoiGianKetThuc DATETIME,
    GhiChu TEXT,
    FOREIGN KEY (MaDon) REFERENCES DonGiat(MaDon),
    FOREIGN KEY (MaCongDoan) REFERENCES CongDoan(MaCongDoan),
    FOREIGN KEY (MaMay) REFERENCES MayGiat(MaMay),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
