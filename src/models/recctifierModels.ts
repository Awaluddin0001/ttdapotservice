// models/Rectifier.ts
export interface Rectifier {
  id: number;
  brand_id: number;
  vendor_id: number;
  user_id: number;
  maintenance_id: number;
  installation_date: string;
  created_at: string;
  name: string;
  role: string;
  type: string;
  capacity: number;
  modul: string;
  capacity_modul: number;
  load_current: number;
  occupancy: number;
  remark_aging: string;
  warranty: string;
  system: string;
  // properti lainnya sesuai dengan tabel rectifier
}

// models/Brand.ts
export interface Brand {
  id: number;
  name: string;
  // properti lainnya sesuai dengan tabel rectifier_brand
}

// models/Vendor.ts
export interface Vendor {
  id: number;
  company: string;
  // properti lainnya sesuai dengan tabel electrical_vendor
}

// models/User.ts
export interface User {
  id: number;
  name: string;
  // properti lainnya sesuai dengan tabel user
}

// models/Maintenance.ts
export interface Maintenance {
  id: number;
  maintenance_date: string;
  // properti lainnya sesuai dengan tabel maintenance_electrical
}

// models/RectifierQueryResult.ts
export interface RectifierQueryResult extends Rectifier {
  brand_name: string;
  vendor_name: string;
  user_name: string;
  maintenance_date: string | null;
}
