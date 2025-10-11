export default interface Order {
  madh: number;
  makh: number;
  ngaydat: string;
  tongtien: number;
  matrangthai: number;
  diachi_giao: string;
  items: OrderItem[];
  paymentMethod: string;
}