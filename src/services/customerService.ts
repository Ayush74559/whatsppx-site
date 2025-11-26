import { supabase } from '@/lib/supabase';
import type { Customer } from '@/types';

class CustomerService {
  async getCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('last_contact', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(customer => ({
      ...customer,
      lastContact: new Date(customer.last_contact),
    }));
  }

  async getCustomer(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching customer:', error);
      return null;
    }
    
    return {
      ...data,
      lastContact: new Date(data.last_contact),
    };
  }

  async createCustomer(customer: Omit<Customer, 'id' | 'totalMessages' | 'lastContact'>) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('customers')
      .insert({
        user_id: userData.user.id,
        ...customer,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteCustomer(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async addTag(id: string, tag: string) {
    const customer = await this.getCustomer(id);
    if (!customer) throw new Error('Customer not found');

    const tags = [...(customer.tags || []), tag];
    return this.updateCustomer(id, { tags });
  }

  async removeTag(id: string, tag: string) {
    const customer = await this.getCustomer(id);
    if (!customer) throw new Error('Customer not found');

    const tags = (customer.tags || []).filter(t => t !== tag);
    return this.updateCustomer(id, { tags });
  }

  async updateLeadStage(id: string, leadStage: Customer['leadStage']) {
    return this.updateCustomer(id, { leadStage });
  }
}

export const customerService = new CustomerService();
