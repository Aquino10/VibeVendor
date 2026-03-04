/**
 * ScanKart Dashboard - Matches reference design
 * Shows today's sales, payment breakdown, low stock alerts
 */

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  TrendingUp,
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { BottomNav } from "@/components/scankart/BottomNav";
import { AnimatedCounter } from "@/components/scankart/AnimatedCounter";
import { getDashboardStats, type DashboardStats } from "@/lib/scankart";

export default function ScanKartDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const [stats, setStats] = useState<DashboardStats>({
    todaySales: 0, todayOrders: 0, upiTotal: 0, cashTotal: 0, lowStockItems: [],
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!slug) return;
    try {
      const data = await getDashboardStats(slug);
      setStats(data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const upiTxn = stats.todayOrders > 0 ? Math.round((stats.upiTotal / (stats.todaySales || 1)) * stats.todayOrders) : 0;
  const cashTxn = stats.todayOrders - upiTxn;
  const upiPercent = stats.todaySales > 0 ? (stats.upiTotal / stats.todaySales) * 100 : 50;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card px-6 pb-5 pt-10">
        <h1 className="font-heading text-3xl font-black text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Today's business overview</p>
      </div>

      <div className="border-b border-border/30" />

      <div className="px-4 py-6 space-y-5">
        {/* Today's Sales Card */}
        <div className="clay p-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-muted-foreground">Today's Sales</span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live
            </span>
          </div>
          <AnimatedCounter
            value={stats.todaySales}
            prefix="₹"
            className="text-4xl font-black text-foreground"
          />
          <div className="mt-4 flex items-center justify-center gap-0 rounded-xl border border-border/30 bg-background">
            <div className="flex items-center gap-2 px-6 py-3 border-r border-border/30">
              <span className="h-3 w-3 rounded bg-primary" />
              <span className="text-sm font-semibold text-foreground">{stats.todayOrders}</span>
              <span className="text-xs text-muted-foreground">Orders</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                ₹{stats.todayOrders > 0 ? Math.round(stats.todaySales / stats.todayOrders) : 0}
              </span>
              <span className="text-xs text-muted-foreground">Avg Order</span>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="clay p-6">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Payment Breakdown</h2>

          {/* Progress bar */}
          <div className="mb-5 flex h-3 w-full overflow-hidden rounded-full bg-muted/20">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${upiPercent}%`, minWidth: stats.todaySales > 0 ? '8px' : '50%' }}
            />
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${100 - upiPercent}%`, minWidth: stats.todaySales > 0 ? '8px' : '50%' }}
            />
          </div>

          <div className="space-y-3">
            <div className="clay-sm flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">UPI</p>
                  <p className="text-lg font-black text-foreground">₹{stats.upiTotal.toLocaleString()}</p>
                </div>
              </div>
              <span className="clay-pill bg-muted/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {upiTxn} txn
              </span>
            </div>
            <div className="clay-sm flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Cash</p>
                  <p className="text-lg font-black text-foreground">₹{stats.cashTotal.toLocaleString()}</p>
                </div>
              </div>
              <span className="clay-pill bg-muted/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {cashTxn} txn
              </span>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {stats.lowStockItems.length === 0 ? (
          <div className="clay p-8 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-7 w-7 text-emerald-600" />
            </div>
            <p className="font-bold text-foreground">All Stocked Up</p>
            <p className="text-sm text-muted-foreground">Every product has sufficient inventory</p>
          </div>
        ) : (
          <div className="clay p-6">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Low Stock Alerts
            </h2>
            <div className="space-y-2">
              {stats.lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className={item.stock === 0 ? "clay-danger p-4" : "clay-sm p-4"}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">₹{Number(item.price).toLocaleString()}</p>
                    </div>
                    <div className={`clay-pill px-3 py-1 text-sm font-bold ${
                      item.stock === 0
                        ? "bg-destructive/10 text-destructive"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {item.stock} left
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
