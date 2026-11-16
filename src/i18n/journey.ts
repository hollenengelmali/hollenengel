import type { Lang } from './ui';

export interface JourneyStep {
  weeks: string;
  title: string;
  text: string;
}

export const journey: Record<Lang, JourneyStep[]> = {
  ro: [
    {
      weeks: 'Săptămânile 0–2',
      title: 'Început liniștit',
      text: 'Puii rămân lângă mamă. Stimulare neurologică timpurie ușoară, cântărire zilnică și un mediu curat și calm.',
    },
    {
      weeks: 'Săptămânile 3–4',
      title: 'Primele explorări',
      text: 'Ochii și urechile se deschid, puii descoperă texturi, sunete și primele jucării. Începe înțărcarea.',
    },
    {
      weeks: 'Săptămânile 5–6',
      title: 'Socializare',
      text: 'Întâlnesc oameni noi, copii calmi și suprafețe diferite. Primele deparazitări și antrenament de curățenie.',
    },
    {
      weeks: 'Săptămânile 7–8',
      title: 'Pregătiți de plecare',
      text: 'Vaccin, microcip, control medical și test de temperament. Fiecare pui primește un dosar complet.',
    },
    {
      weeks: 'Acasă',
      title: 'Sprijin continuu',
      text: 'Rămânem la dispoziția familiei pentru sfaturi de hrană, educație și antrenament, pe toată viața câinelui.',
    },
  ],
  en: [
    {
      weeks: 'Weeks 0–2',
      title: 'A calm start',
      text: 'Puppies stay close to their mother. Gentle early neurological stimulation, daily weighing and a clean, quiet environment.',
    },
    {
      weeks: 'Weeks 3–4',
      title: 'First explorations',
      text: 'Eyes and ears open, puppies discover textures, sounds and their first toys. Weaning begins.',
    },
    {
      weeks: 'Weeks 5–6',
      title: 'Socialisation',
      text: 'They meet new people, calm children and different surfaces. First deworming and house-training.',
    },
    {
      weeks: 'Weeks 7–8',
      title: 'Ready to go',
      text: 'Vaccination, microchip, vet check and temperament test. Every puppy goes home with a full file.',
    },
    {
      weeks: 'At home',
      title: 'Lifelong support',
      text: 'We stay available to every family for feeding, education and training advice, for the whole life of the dog.',
    },
  ],
};
