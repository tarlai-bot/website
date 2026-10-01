import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Store as StoreIcon,
  Event as EventIcon,
  Image as ImageIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import { DashboardStats } from "../types";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockStats: DashboardStats = {
        stores: {
          total: 25,
          active: 25,
          byType: {
            store: 10,
            restaurant: 5,
            entertainment: 5,
            hypermarket: 5,
          },
        },
        events: {
          total: 10,
          active: 3,
          featured: 3,
          upcoming: 7,
        },
        gallery: {
          total: 22,
          onHomePage: 6,
          totalSize: "2.3 GB",
        },
        inquiries: {
          total: 89,
          new: 23,
          byType: {
            contact: 34,
            rental: 21,
            investment: 15,
            job_application: 19,
          },
        },
        rentalSpaces: {
          total: 8,
          occupied: 5,
          vacant: 3,
          maintenance: 0,
          occupancyRate: 63,
        },
        recentActivity: [
          {
            id: "1",
            action: "Updated",
            entity: "Event",
            entityId: "evt-123",
            user: "Sarah Ahmad",
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            details: "Summer Festival 2025",
          },
          {
            id: "2",
            action: "Created",
            entity: "Store",
            entityId: "str-456",
            user: "Mohammed Ali",
            timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            details: "Starbucks - Ground Floor",
          },
          {
            id: "3",
            action: "Approved",
            entity: "Inquiry",
            entityId: "inq-789",
            user: "Fatima Hassan",
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            details: "Rental Request - Unit 204",
          },
        ],
      };

      setStats(mockStats);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with Alamer Mall today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 mb-6">
        {/* Stores Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <StoreIcon className="text-primary" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">
                {stats?.stores.total}
              </h4>
              <span className="text-sm font-medium text-gray-600">
                Total Stores
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="w-4 h-4" />
                12.5%
              </span>
              <span className="text-xs text-gray-500 mt-1">vs last month</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
              {stats?.stores.active} Active
            </span>
          </div>
        </div>

        {/* Events Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10">
                  <EventIcon className="text-secondary" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">
                {stats?.events.total}
              </h4>
              <span className="text-sm font-medium text-gray-600">
                Total Events
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="w-4 h-4" />
                8.2%
              </span>
              <span className="text-xs text-gray-500 mt-1">vs last month</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
              {stats?.events.upcoming} Upcoming
            </span>
          </div>
        </div>

        {/* Gallery Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-info/10">
                  <ImageIcon className="text-info" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">
                {stats?.gallery.total}
              </h4>
              <span className="text-sm font-medium text-gray-600">
                Gallery Images
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="w-4 h-4" />
                15.3%
              </span>
              <span className="text-xs text-gray-500 mt-1">vs last month</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-info/10 px-2.5 py-0.5 text-xs font-medium text-info">
              {stats?.gallery.onHomePage} on Homepage
            </span>
          </div>
        </div>

        {/* Inquiries Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20">
                  <MailIcon className="text-primary" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">
                {stats?.inquiries.total}
              </h4>
              <span className="text-sm font-medium text-gray-600">
                Inquiries
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 text-sm font-medium text-danger">
                <TrendingDown className="w-4 h-4" />
                3.1%
              </span>
              <span className="text-xs text-gray-500 mt-1">vs last month</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">
              {stats?.inquiries.new} New
            </span>
          </div>
        </div>

        {/* Rental Spaces Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100">
                  <StoreIcon className="text-purple-600" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">
                {stats?.rentalSpaces?.total || 0}
              </h4>
              <span className="text-sm font-medium text-gray-600">
                Rental Spaces
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-bold text-purple-600">
                {stats?.rentalSpaces?.occupancyRate || 0}%
              </span>
              <span className="text-xs text-gray-500 mt-1">Occupancy</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
              {stats?.rentalSpaces?.occupied || 0} Occupied
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {stats?.rentalSpaces?.vacant || 0} Vacant
            </span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Store Types Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Store Distribution
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats?.stores.byType && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Retail Stores
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.stores.byType.store}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${
                          (stats.stores.byType.store / stats.stores.total) * 100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-secondary"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Restaurants
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.stores.byType.restaurant}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-secondary"
                      style={{
                        width: `${
                          (stats.stores.byType.restaurant /
                            stats.stores.total) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-info"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Entertainment
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.stores.byType.entertainment}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-info"
                      style={{
                        width: `${
                          (stats.stores.byType.entertainment /
                            stats.stores.total) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-success"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Hypermarket
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.stores.byType.hypermarket}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-success"
                      style={{
                        width: `${
                          (stats.stores.byType.hypermarket /
                            stats.stores.total) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats?.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 shrink-0">
                    <span className="text-sm font-semibold text-gray-700">
                      {activity.user.split(" ")[0].charAt(0)}
                      {activity.user.split(" ")[1]?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action.toLowerCase()}{" "}
                      <span className="font-semibold">{activity.entity}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {activity.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Types */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Inquiries by Type
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats?.inquiries.byType && (
              <>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-3xl font-bold text-primary">
                    {stats.inquiries.byType.contact}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Contact</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-3xl font-bold text-secondary">
                    {stats.inquiries.byType.rental}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Rental</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-3xl font-bold text-info">
                    {stats.inquiries.byType.investment}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Investment</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-3xl font-bold text-success">
                    {stats.inquiries.byType.job_application}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Careers</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
