export class Invoice {
  id?: string;
  branch?: string
  city?: string;
  customerType?: string;
  gender?: string;
  productLine?: string;
  unitPrice?: number;
  quantity?: string;
  tax?: number;
  total?: number;
  date?: Date
  time?: string;
  payment?: string;
  cogs?: number;
  grossMarginPercentage?: number;
  grossIncome?: number;
  rating?: number;

  constructor(id: string, branch: string, quantity: string) {
    this.id = id;
    this.branch = branch;
    this.quantity = quantity;

  }
}