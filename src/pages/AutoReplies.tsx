import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequireAuth } from '@/hooks/useAuth';
import { Plus, Edit, Trash2, Save, X, Bot } from 'lucide-react';
import { autoReplyService } from '@/services/autoReplyService';
import { toast } from 'sonner';
import type { AutoReply } from '@/types';

export function AutoReplies() {
  const { loading: authLoading } = useRequireAuth();
  const [replies, setReplies] = useState<AutoReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newReply, setNewReply] = useState({
    name: '',
    trigger: 'keyword' as AutoReply['trigger'],
    keywords: '',
    response: '',
  });

  useEffect(() => {
    loadReplies();
  }, []);

  const loadReplies = async () => {
    try {
      const data = await autoReplyService.getAutoReplies();
      setReplies(data);
    } catch (error) {
      console.error('Error loading replies:', error);
      toast.error('Failed to load auto-replies');
    } finally {
      setLoading(false);
    }
  };

  const toggleReply = async (id: string, enabled: boolean) => {
    try {
      await autoReplyService.toggleAutoReply(id, !enabled);
      setReplies(replies.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
      toast.success('Auto-reply updated');
    } catch (error: unknown) {
      toast.error((error instanceof Error ? error.message : 'Failed to update auto-reply'));
    }
  };

  const handleCreateReply = async () => {
    if (!newReply.name || !newReply.response) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const keywords = newReply.keywords.split(',').map((k) => k.trim()).filter(Boolean);
      const created = await autoReplyService.createAutoReply({
        name: newReply.name,
        trigger: newReply.trigger,
        keywords,
        response: newReply.response,
        enabled: true,
      });
      setReplies([created, ...replies]);
      setNewReply({ name: '', trigger: 'keyword', keywords: '', response: '' });
      setShowNewForm(false);
      toast.success('Auto-reply created successfully');
    } catch (error: unknown) {
      toast.error((error instanceof Error ? error.message : 'Failed to create auto-reply'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this auto-reply?')) return;
    
    try {
      await autoReplyService.deleteAutoReply(id);
      setReplies(replies.filter((r) => r.id !== id));
      toast.success('Auto-reply deleted');
    } catch (error: unknown) {
      toast.error((error instanceof Error ? error.message : 'Failed to delete auto-reply'));
    }
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Auto Replies</h1>
            <p className="text-muted-foreground">
              Set up automated responses for common customer queries
            </p>
          </div>
          <Button onClick={() => setShowNewForm(true)} className="bg-gradient-primary">
            <Plus className="w-5 h-5 mr-2" />
            New Reply
          </Button>
        </div>

        {/* Auto Replies List */}
        {replies.length === 0 && !showNewForm ? (
          <Card className="glass-card p-12">
            <div className="text-center">
              <Bot className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No auto-replies yet</h3>
              <p className="text-muted-foreground mb-4">
                Create auto-replies to handle common customer questions automatically
              </p>
              <Button onClick={() => setShowNewForm(true)} className="bg-gradient-primary">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Auto-Reply
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {replies.map((reply) => (
              <Card key={reply.id} className="glass-card p-6 hover-glow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{reply.name}</h3>
                      <Badge variant="outline" className="capitalize">
                        {reply.trigger.replace('_', ' ')}
                      </Badge>
                    </div>
                    {reply.keywords && reply.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">Keywords:</span>
                        {reply.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {reply.response}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch
                      checked={reply.enabled}
                      onCheckedChange={() => toggleReply(reply.id, reply.enabled)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-4 border-t border-border/50">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => handleDelete(reply.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Create New Reply Card */}
        {showNewForm && (
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Auto-Reply</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowNewForm(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reply-name">Reply Name</Label>
                <Input 
                  id="reply-name" 
                  placeholder="e.g., Welcome Message" 
                  className="mt-1"
                  value={newReply.name}
                  onChange={(e) => setNewReply({ ...newReply, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="trigger">Trigger Type</Label>
                <Select
                  value={newReply.trigger}
                  onValueChange={(value) => setNewReply({ ...newReply, trigger: value as AutoReply['trigger'] })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greeting">Greeting</SelectItem>
                    <SelectItem value="keyword">Keyword</SelectItem>
                    <SelectItem value="away">Away Message</SelectItem>
                    <SelectItem value="business_hours">Business Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., hi, hello, hey"
                  className="mt-1"
                  value={newReply.keywords}
                  onChange={(e) => setNewReply({ ...newReply, keywords: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="response">Response Message</Label>
                <Textarea
                  id="response"
                  placeholder="Enter your auto-reply message..."
                  rows={5}
                  className="mt-1"
                  value={newReply.response}
                  onChange={(e) => setNewReply({ ...newReply, response: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateReply} className="bg-gradient-primary">
                <Save className="w-5 h-5 mr-2" />
                Save Auto-Reply
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
