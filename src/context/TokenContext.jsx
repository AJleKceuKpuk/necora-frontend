// src/context/TokenContext.js
import { createContext } from 'react';

// По умолчанию контекст пустой — null. Хук потом проверит, что его обернули провайдером.
export const TokenContext = createContext(null);
