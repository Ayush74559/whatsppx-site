import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRequireAuth } from '@/hooks/useAuth';
import { Search, Filter, UserPlus, Phone, Mail, Trash2 } from 'lucide-react';
import { customerService } from '@/services/customerService';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import type { Customer } from '@/types';

export function CRM() {
  const { loading: authLoading } = useRequireAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      await customerService.deleteCustomer(id);
      setCustomers(customers.filter((c) => c.id !== id));
      toast.success('Customer deleted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete customer');
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500',
      contacted: 'bg-yellow-500',
      qualified: 'bg-purple-500',
      converted: 'bg-green-500',
    };
    return colors[stage] || 'bg-gray-500';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Customer CRM</h1>
            <p className="text-muted-foreground">
              Manage your customer relationships and track interactions
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <UserPlus className="w-5 h-5 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: customers.length },
            { label: 'New Leads', value: customers.filter((c) => c.leadStage === 'new').length },
            { label: 'Qualified', value: customers.filter((c) => c.leadStage === 'qualified').length },
            { label: 'Converted', value: customers.filter((c) => c.leadStage === 'converted').length },
          ].map((stat, i) => (
            <Card key={i} className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Customer List */}
        {filteredCustomers.length === 0 ? (
          <Card className="glass-card p-12">
            <div className="text-center">
              <UserPlus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No customers yet</h3>
              <p className="text-muted-foreground mb-4">
                Start adding customers to track your interactions
              </p>
              <Button className="bg-gradient-primary">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Your First Customer
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="glass-card p-6 hover-glow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{customer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {customer.phone}
                        </span>
                        {customer.email && (
                          <span className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {customer.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStageColor(customer.leadStage)} text-white`}>
                    {customer.leadStage}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {customer.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50 mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                    <p className="font-semibold">{customer.totalMessages}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Contact</p>
                    <p className="font-semibold">
                      {formatDistanceToNow(customer.lastContact, { addSuffix: true })}
                    </p>
                  </div>
                </div>

                {customer.notes && (
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm">{customer.notes}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Conversation
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
