import { z } from 'zod';

export const launchSchema = z.object({
  launchDate: z
    .string()
    .min(1, 'Launch date is required')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Launch date must be in the future',
    }),
  missionName: z
    .string()
    .min(1, 'Mission name is required')
    .max(100, 'Mission name must be less than 100 characters'),
  rocketName: z
    .string()
    .min(1, 'Rocket name is required')
    .max(100, 'Rocket name must be less than 100 characters'),
  planetName: z.string().min(1, 'Destination planet is required'),
});

export type LaunchFormValues = z.infer<typeof launchSchema>;

export const initialValues: LaunchFormValues = {
  launchDate: '',
  missionName: '',
  rocketName: '',
  planetName: '',
};
