import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  AlertTriangle,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  // Static data for demonstration
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      icon: DollarSign,
      change: "+8.2%",
    },
    {
      title: "Prescriptions Today",
      value: "87",
      icon: Package,
      change: "+3.1%",
    },
    { title: "Active Patients", value: "1,234", icon: Users, change: "+2.5%" },
    {
      title: "Low Stock Items",
      value: "12",
      icon: AlertTriangle,
      change: "-2",
      alert: true,
    },
  ];

  const recentPrescriptions = [
    {
      id: "RX001",
      patient: "Emma Watson",
      medication: "Amoxicillin 500mg",
      status: "Pending",
      date: "2026-02-24",
    },
    {
      id: "RX002",
      patient: "James Smith",
      medication: "Lisinopril 10mg",
      status: "Completed",
      date: "2026-02-23",
    },
    {
      id: "RX003",
      patient: "Maria Garcia",
      medication: "Metformin 850mg",
      status: "In Progress",
      date: "2026-02-23",
    },
    {
      id: "RX004",
      patient: "Robert Brown",
      medication: "Atorvastatin 20mg",
      status: "Pending",
      date: "2026-02-22",
    },
  ];

  const lowStockAlerts = [
    { item: "Ibuprofen 400mg", currentStock: 15, threshold: 20 },
    { item: "Paracetamol 500mg", currentStock: 8, threshold: 30 },
    { item: "Amoxicillin 250mg", currentStock: 12, threshold: 25 },
    { item: "Insulin Glargine", currentStock: 5, threshold: 10 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            Pending
          </Badge>
        );
      case "Completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Completed
          </Badge>
        );
      case "In Progress":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            In Progress
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-4 w-4 ${
                  stat.alert ? "text-red-500" : "text-muted-foreground"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.alert ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>Latest 4 prescriptions entered.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPrescriptions.map((rx) => (
                  <TableRow key={rx.id}>
                    <TableCell className="font-medium">{rx.id}</TableCell>
                    <TableCell>{rx.patient}</TableCell>
                    <TableCell>{rx.medication}</TableCell>
                    <TableCell>{getStatusBadge(rx.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Prescriptions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Items below reorder threshold.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockAlerts.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.threshold}</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="text-xs">
                        Reorder
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Manage Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simple Activity Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Sales Trend
          </CardTitle>
          <CardDescription>
            Prescription sales over the last 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full rounded-md bg-muted flex items-center justify-center text-muted-foreground">
            [Chart Placeholder] – Connect to real data later
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
