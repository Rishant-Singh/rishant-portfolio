import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-dark-900">
            <AdminSidebar />
            {/* Content shifts right to accommodate sidebar (240px default) */}
            <main className="flex-1 ml-16 md:ml-60 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
