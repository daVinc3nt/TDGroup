"use client";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/Hero/Hero";
import GridGlobe from "@/components/ui/GridGlobe";

const Home = () => {
  return (
    <section className="flex w-full h-full">
      <Sidebar />
      <main className="relative  flex justify-center items-center flex-col overflow-hidden w-full">
        <FloatingNav />
        <Hero heading={"Tổng công ty TienDung"}
          message={"Thay đổi thế giới theo cách của bạn!"} />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </main>
    </section>

  );
};

export default Home;
