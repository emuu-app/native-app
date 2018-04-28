import React from 'react';

export const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};

export const ContactsContext = React.createContext(
  themes.dark // default value
);
