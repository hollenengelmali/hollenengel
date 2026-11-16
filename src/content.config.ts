import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const dogs = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/dogs' }),
  schema: z.object({
    name: z.string(),
    sex: z.enum(['male', 'female']),
    status: z.enum(['active', 'retired', 'memorial']).default('active'),
    birth_date: z.coerce.date().optional(),
    color: z.string().optional(),
    photo: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    titles: z.array(z.string()).default([]),
    pedigree: z
      .object({
        sire: z.string(),
        dam: z.string(),
        sire_sire: z.string(),
        sire_dam: z.string(),
        dam_sire: z.string(),
        dam_dam: z.string(),
      })
      .partial()
      .default({}),
    pedigree_url: z.string().optional(),
    health: z
      .array(
        z.object({
          test: z.string(),
          result: z.string(),
          date: z.coerce.date().optional(),
        }),
      )
      .default([]),
    description_ro: z.string().default(''),
    description_en: z.string().default(''),
  }),
});

const litters = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/litters' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['planned', 'expected', 'born', 'past']),
    sire: reference('dogs').optional(),
    dam: reference('dogs').optional(),
    expected_date: z.coerce.date().optional(),
    birth_date: z.coerce.date().optional(),
    description_ro: z.string().default(''),
    description_en: z.string().default(''),
    puppies: z
      .array(
        z.object({
          name: z.string(),
          sex: z.enum(['male', 'female']),
          color: z.string().optional(),
          status: z.enum(['available', 'reserved', 'sold']).default('available'),
          photo: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/updates' }),
  schema: z.object({
    title_ro: z.string(),
    title_en: z.string(),
    date: z.coerce.date(),
    category: z.enum(['competition', 'training', 'other']).default('other'),
    image: z.string().optional(),
    body_ro: z.string().default(''),
    body_en: z.string().default(''),
  }),
});

export const collections = { dogs, litters, updates };
