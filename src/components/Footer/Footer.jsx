import React from "react";
import "./Footer.css";
import linkedinimg from "../../assets/linkedin.png";
import instagramimg from "../../assets/instagram.png";
import twitterimg from "../../assets/X_logo.jpg";

const FooterLink = ({ link, className, image, alt, id, items }) => {
  return (
    <div>
      <a href={link} className={className} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={alt} />
      </a>

      <div id={id} className={className}>
        {/* items is an array */}
        {items && items.map((item, index) => (
          <p key={index}>
            <a href={item.link}>{item.text}</a>
          </p>
        ))}
      </div>
    </div>
  );
};

const FooterSection = () => {
  const socialLinks = [
    {
      link: "https://www.linkedin.com/company/celestial-biscuit-igdtuw/posts/?feedView=all",
      className: "linkedin",
      image: linkedinimg,
      alt: "LinkedIn",
    },
    {
      link: "https://www.instagram.com/celestialbiscuit/",
      className: "instagram",
      image: instagramimg,
      alt: "Instagram",
    },
    {
      link: "https://x.com/cbigdtuw?lang=en",
      className: "twitter",
      image: twitterimg,
      alt: "Twitter",
    },
  ];

  const infoSections = [
    {
      id: "info1",
      className: "info",
      items: [
        { text: "About us", link: "/about-us" },
        { text: "Team Member", link: "/team" },
        { text: "Our Goals", link: "/goals" },
      ],
    },
    {
      id: "info2",
      className: "info",
      items: [
        { text: "Frequently Asked Questions", link: "/faq" },
        { text: "Terms & Conditions", link: "/terms" },
        { text: "Our Services", link: "/services" },
        { text: "Help Centre", link: "/help" },
      ],
    },
  ];

  return (
    <footer>
    <div >
      <h2 id="heading">IGDTUW MARKETPLACE</h2>
      <p id="Contact">Contact us:</p>
      <div id="soci-icons">
         {socialLinks.map((link, index) => (
         <FooterLink key={index} {...link} />
         ))}
      </div>
    </div>

     
      <div id="info-contact">
        {infoSections.map((section, index) => (
          <div key={index} id={section.id} className={section.className}>
            {section.items.map((item, i) => (
              <p key={i}>
                <a href={item.link}>{item.text}</a>
              </p>
            ))}
          </div>
        ))}
      </div>

      <div id="copyright">
        &copy; Copyright by{" "}
        <a href="https://www.linkedin.com/company/celestial-biscuit-igdtuw/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
          Celestial Biscuit
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
