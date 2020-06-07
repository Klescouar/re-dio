import React from "react";
import Rodal from "rodal";

export default function Modal({ modalIsOpen, handleModal }) {
  return (
    <Rodal visible={modalIsOpen} onClose={handleModal} animation="slideDown">
      <div className="Modal">
        <p className="Modal__Text">
          Si vous voulez soutenir Ré - dio, payez nous un ti - punch(emoji ti
          punch ou pas loin je ne le trouve pas mais il existe) !En effet, cette
          web radio à un coût de fonctionnement d 'environ 600 euros à l' année
          soit 120 ti - punchs à 5 euros(tarif Ile de Ré).Le ti - punch est
          notre carburant nécessaire pour créer, innover et améliorer ce beau
          projet et vous pouvez y contribuer ici ==>
          <a
            className="Modal__Text__Link"
            href="https://www.paypal.com"
            target="_blank"
          >
            lien PayPal
          </a>
          .
        </p>
        <p className="Modal__Subtitle">
          L 'abus d' alcool est dangereux pour la santé.Mangez 5 citrons verts
          par jour. Pour votre santé: bougez buvez et vive l 'Ile de Ré.
        </p>
      </div>
    </Rodal>
  );
}
