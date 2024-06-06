"use client";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex w-full h-full">
            <Sidebar />
            <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto w-full">
                <FloatingNav />
                {children}
            </main>
        </section>

    );
};

export default DashboardLayout
    ;
