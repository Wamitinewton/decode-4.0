export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'organization';
  phone?: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  cropType: string;
  quantity: string;
  deadline: string;
  organizationName: string;
  organizationId: string;
  location: string;
  status: 'open' | 'closed';
  createdAt: string;
}

export interface Application {
  id: string;
  tenderId: string;
  farmerId: string;
  farmerName: string;
  phone: string;
  cropDetails: string;
  status: 'pending' | 'accepted' | 'rejected';
  idDocumentUrl?: string;
  cropImageUrl?: string;
  submittedAt: string;
}
