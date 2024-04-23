import React from "react";

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="my-4 p-6">
      <div className="flex justify-start p-2">
        <div className="space-y-2 w-1/6">
          <p className="font-light text-sm text-gray-400">Support</p>
          <div className="space-y-2">
            <h6 className="text-sm">Home</h6>
            <h6 className="text-sm">About</h6>
            <h6 className="text-sm">Contact</h6>
          </div>
        </div>
        <div className="space-y-2 w-1/6">
          <p className="font-light text-sm text-gray-400">Trending</p>
          <div className="space-y-2">
            <h6 className="text-sm">Shop</h6>
            <h6 className="text-sm">Single</h6>
            <h6 className="text-sm">Who are we</h6>
          </div>
        </div>
        <div className="space-y-2 w-1/6">
          <p className="font-light text-sm text-gray-400">Get to know us</p>
          <div className="space-y-2">
            <h6 className="text-sm">Niche demos</h6>
            <h6 className="text-sm">Home pages</h6>
            <h6 className="text-sm">One pages</h6>
          </div>
        </div>
        <div className=" w-1/6 space-y-2">
          <p className="font-light text-sm text-gray-400">Follow us</p>
          <div className="flex gap-3">
            <FaInstagram size={20} />
            <FaFacebook size={20} />
            <FaTwitter size={20} />
            <FaYoutube size={20} />
            <FaWhatsapp size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
