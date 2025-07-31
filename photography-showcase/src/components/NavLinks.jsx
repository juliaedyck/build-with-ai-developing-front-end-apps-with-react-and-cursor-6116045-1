import React from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const NavLinks = ({ orientation = "horizontal" }) => {
  const baseClass =
    "rounded-md text-gray-800 font-medium hover:bg-gray-200 transition-colors";
  const horizontal = "px-3 py-1";
  const vertical = "px-3 py-2";

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={
            baseClass +
            " " +
            (orientation === "horizontal" ? horizontal : vertical)
          }
        >
          {link.label}
        </a>
      ))}
    </>
  );
};

export default NavLinks; 