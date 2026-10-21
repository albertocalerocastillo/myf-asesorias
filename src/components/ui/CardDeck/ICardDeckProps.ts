import type { ReactNode } from 'react';
import type { ScrollRevealPart } from '../ScrollRevealText/IScrollRevealTextProps';

export interface CardDeckItem {
  /** Identificador único de la tarjeta. */
  id: string;
  /** Parte de arriba de la tarjeta (un dibujo, una foto con nombre...). */
  header: ReactNode;
  /** Texto, en trozos para poder resaltar partes. Se enciende palabra a palabra al posarse la tarjeta. */
  parts: ScrollRevealPart[];
  /** Fondo y color de texto de la tarjeta. */
  className: string;
  /** Color de partida de las palabras (debe contrastar con el fondo de la tarjeta). */
  dimColor: string;
}

export interface ICardDeckProps {
  /** Antetítulo de la sección. */
  eyebrow: string;
  /** Titular de la sección (admite <em> para la parte resaltada). */
  title: ReactNode;
  /** Tarjetas, en orden. */
  cards: CardDeckItem[];
}
