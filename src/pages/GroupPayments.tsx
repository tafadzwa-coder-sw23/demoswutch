import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Share2, CheckCircle, Clock, DollarSign } from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: 'pending' | 'paid' | 'declined';
  joinedAt: string;
}

const GroupPayments = () => {
  const [groupCode, setGroupCode] = useState("");
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [groupName, setGroupName] = useState("");

  const mockGroup = {
    id: "GRP123",
    name: "Weekend Shopping",
    totalAmount: 245.50,
    members: [
      { id: '1', name: 'John M.', email: 'john@example.com', amount: 82.50, status: 'paid' as const, joinedAt: '2 hours ago' },
      { id: '2', name: 'Sarah K.', email: 'sarah@example.com', amount: 78.00, status: 'pending' as const, joinedAt: '1 hour ago' },
      { id: '3', name: 'Mike T.', email: 'mike@example.com', amount: 85.00, status: 'paid' as const, joinedAt: '30 min ago' },
    ]
  };

  const joinGroup = () => {
    if (groupCode === mockGroup.id) {
      setMembers(mockGroup.members);
      setTotalAmount(mockGroup.totalAmount);
      setGroupName(mockGroup.name);
    }
  };

  const createGroup = () => {
    const newGroup = {
      id: "GRP" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      name: groupName || "New Group",
      totalAmount: 0,
      members: []
    };
    setGroupCode(newGroup.id);
    setMembers([]);
    setTotalAmount(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'declined': return 'destructive';
      default: return 'outline';
    }
  };

  const paidAmount = members.reduce((sum, m) => sum + (m.status === 'paid' ? m.amount : 0), 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Group Payments</h1>
          <p className="text-muted-foreground">Split costs and pay together with friends</p>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {!groupCode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Join Group</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter group code"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                  />
                  <Button onClick={joinGroup} className="w-full">
                    Join Group
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Create Group</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                  <Button onClick={createGroup} className="w-full" variant="outline">
                    Create New Group
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{groupName}</h3>
                    <p className="text-sm text-muted-foreground">Group Code: {groupCode}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">${paidAmount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Paid</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Group Members</h3>
                <div className="space-y-3">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                        <div className="text-xs text-muted-foreground">Joined {member.joinedAt}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold">${member.amount.toFixed(2)}</div>
                          <Badge variant={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="text-center">
                <Button onClick={() => setGroupCode("")} variant="outline">
                  Leave Group
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPayments;
