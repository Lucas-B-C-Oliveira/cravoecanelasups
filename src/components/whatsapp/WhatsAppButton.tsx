import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsappButton() {
    return (
        <a
            href="https://api.whatsapp.com/send?phone=SEUNUMERO"
            target="_blank"
            rel="noopener noreferrer"
            className="
        fixed
        bottom-4
        right-4
        w-[60px] h-[60px]
        bg-green-500
        rounded-full
        flex items-center justify-center
        shadow-md
        cursor-pointer
        text-white
        transition duration-300 ease-in-out
        hover:bg-green-600
      "
        >
            <FaWhatsapp size={45} />
        </a>
    );
}

