import React from "react";
import axios from "axios";

const GeneratePdf = () => {
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const downloadPdf = async () => {
    try {
      const response = await axios({
        url: "http://127.0.0.1:8000/event/generatedpdf-doc", 
        method: "GET",
        responseType: "blob", 
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = "events-report.pdf"; 

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div>
      <button onClick={downloadPdf}>GENERATE PDF</button>
    </div>
  );
};

export default GeneratePdf;
