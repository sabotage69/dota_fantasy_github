import Head from "next/head";
import Header from "../components/GENERAL/Header";
import Footer from "../components/GENERAL/Footer";
import React from "react";
import FAQ from "../components/GENERAL/FAQ";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

export default function FaqPage() {
  const [currentIsMobile, setCurrentIsMobile] = useState(null);

  useEffect(() => {
    // Check if we are on the client-side (browser) before accessing the window object
    if (typeof window !== "undefined") {
      setCurrentIsMobile(window.innerHeight > window.innerWidth);
    }
  }, []); // Empty dependency array ensures the code runs once after component mount

  return (
    <>
      <Head>
        <title>Fantasy betting platform</title>
        <meta name="description" content="Fantasy betting platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="web-container">
        <Header isMobile={currentIsMobile} />
        <FAQ />
        <Footer isMobile={currentIsMobile} />
      </div>
    </>
  );
}
