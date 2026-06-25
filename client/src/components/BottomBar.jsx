import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const BottomBar = () => {
  return (
    <div data-aos="fade-up">  {/* Bottom Bar */}
  <div className="relative bg-[#070707] py-3 text-[13px] text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-dotted border-primary/20">
   <div className='flex flex-col gap-2 sm:flex-row justify-between items-center'>
     <div className='text-[11px] text-center sm:text-left'>©2026 Medcity International Overseas Corporation. All rights reserved.</div>
      <div className="flex gap-2 justify-center items-center">
        <SocialIcon icon={<FaInstagram />} />
        <SocialIcon icon={<FaFacebookF />} />
        <SocialIcon icon={<FaLinkedinIn />} />
        <SocialIcon icon={<FaTwitter />} />
      </div>
     
  </div></div></div> 
  )
}
function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="flex items-center justify-center rounded-lg bg-darkPrimary p-1 text-white transition hover:bg-primary hover:text-white"
    >
      <div className="h-5 w-5 grid place-content-center">{icon}</div>
    </a>
  );
}

export default BottomBar