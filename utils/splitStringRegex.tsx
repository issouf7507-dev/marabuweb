import React from "react";

function splitStringUsing(input: string): (string | React.ReactNode)[] {
  const charactere: (string | React.ReactNode)[] = [];
  const regex = /[\s\S]/gu; // Gère tous les caractères

  let match;
  while ((match = regex.exec(input)) !== null) {
    if (match[0] === "\n") {
      charactere.push(<br key={charactere.length} />); // Ajoute un <br /> au lieu de "\n"
    } else {
      charactere.push(match[0]);
    }
  }

  return charactere;
}

export default splitStringUsing;
