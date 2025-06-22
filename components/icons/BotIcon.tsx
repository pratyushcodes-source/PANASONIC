
import React from 'react';

export const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 8h-1V4.2C18 3.01 17.01 2 15.79 2H8.21C7.01 2 6 3.01 6 4.2V8H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-7 10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4-3H8V4.2c0-.11.09-.2.21-.2h7.58c.11 0 .21.09.21.2V15z"/>
    <circle cx="12" cy="12" r="1.5"/>
    <circle cx="16" cy="10" r="1"/>
    <circle cx="8" cy="10" r="1"/>
  </svg>
);
