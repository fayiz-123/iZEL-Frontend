import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#000", color: "#fff", padding: "2rem 0" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Support Section */}
        <div style={{ textAlign: "center", color: "#fff" }}>
          <h3>Support</h3>
          <p>Perumattom, Muvattupuzha</p>

          <p>
            <a
              href="mailto:izeldesignerstudio@gmail.com"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              izeldesignerstudio@gmail.com
            </a>
          </p>

          <p>
            <a
              href="tel:+919400647077"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              +91 9400647077
            </a>
          </p>
        </div>

        {/* Social Media Icons */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <a
            href="https://www.instagram.com/izel_design_studio?igsh=eWF0cW9qa3A0MHpm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} color="#E1306C" />
          </a>
          <a
            href="https://wa.me/+919400647077?text=Hello"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={24} color="#25D366" />
          </a>
        </div>

        {/* Copyright */}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#aaa" }}>
          © Copyright 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
