import React from "react";
import Writing from "@/components/write";
import { Metadata } from "next";
import RootLayout from "../layout";

export const metadata: Metadata = {
  title: "Write News",
  description: "Write your news here",
};

const PatientFormPage = () => {
  return (
    <RootLayout>
      <Writing />
    </RootLayout>
  );
};

export default PatientFormPage;
