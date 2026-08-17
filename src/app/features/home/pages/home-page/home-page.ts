import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StepCard } from '../../components/step-card/step-card';

type StepCardData = {
  step: string;
  title: string;
  description: string;
};

@Component({
  selector: 'home-page',
  imports: [RouterLink, StepCard],
  templateUrl: './home-page.html',
})
export default class HomePage {
  stepCards: StepCardData[] = [
    {
      step: '01',
      title: 'Registrá tu incidencia',
      description:
        'Describí el problema o necesidad que querés resolver y registrá una nueva incidencia.',
    },
    {
      step: '02',
      title: 'Encontrá una solución',
      description:
        'La incidencia se asigna a un responsable o puede ser tomada por alguien capacitado para resolverla.',
    },
    {
      step: '03',
      title: 'Resolvé la incidencia',
      description: 'Seguí el avance de la incidencia hasta que sea resuelta.',
    },
  ];
}
