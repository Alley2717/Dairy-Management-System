// frontend/pages/FeedPage.js
'use client';

import React from "react";
import FeedTable from "./components/FeedTable"; // Import FeedTable
import FeedChecklist from "./components/FeedChecklist"; // Import FeedChecklist

const FeedPage = () => {
  const pageStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const headerTextStyle = {
    color: '#333',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
  };

  const sectionStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flex: 1,
  };

  const titleStyle = {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#2d2d2d',
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={headerTextStyle}>Feed Management</h1>
      </header>

      <div style={contentStyle}>
        <div style={sectionStyle}>
          <h2 style={titleStyle}>Feed Inventory</h2>
          <FeedTable />
        </div>

        <div style={sectionStyle}>
          <h2 style={titleStyle}>Feed Checklist</h2>
          <FeedChecklist />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
