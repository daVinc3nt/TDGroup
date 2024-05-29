import React from "react";
import Test from "@/components/tester";
import { Metadata } from "next";
import RootLayout from "../layout";

export const metadata: Metadata = {
  title: "Write News",
  description: "Write your news here",
};

const PatientFormPage = () => {
  return (
    <div className="bg-white">
      <Test />
    </div>
  );
};

export default PatientFormPage;
