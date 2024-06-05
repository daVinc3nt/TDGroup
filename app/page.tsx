"use client";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Sidebar from "@/components/sidebar";
import GridGlobe from "@/components/ui/GridGlobe";

const Home = () => {
  return (
    <section className="flex w-full h-full">
      <Sidebar />
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto px-5 w-full">
        <div className="max-w-7xl w-full">
          <FloatingNav />
          <Hero />
          <Grid />
          <RecentProjects />
          <Clients />
          <Experience />
          <Approach />
          <Footer />

        </div>
      </main>
    </section>

  );
};

export default Home;
