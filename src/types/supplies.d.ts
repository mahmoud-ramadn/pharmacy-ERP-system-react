interface Supplier {
    id: string | number;
    name: string;
    phone: string;
    email?: string;
    paymentType: string;
    address?: string;
    notes?: string;
    status?: "active" | "inactive";
    outstandingBalance?: number; 
    lastOrder?: string; 
}
