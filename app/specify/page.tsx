import React from "react";
import Writing from "@/components/write/writing";
import Writing2 from "@/components/write/specify";
import { Metadata } from "next";
import RootLayout from "../layout";

export const metadata: Metadata = {
  title: "Write News",
  description: "Write your news here",
};

const PatientFormPage = () => {
  return (
    // <RootLayout>
    <Writing2 />
    // </RootLayout>
  );
};

export default PatientFormPage;
