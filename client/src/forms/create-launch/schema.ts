import { z } from 'zod';

export const launchSchema = z.object({
  launchDate: z
    .string({ required_error: 'Launch date is required' })
    .min(1, 'Launch date is required')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Launch date must be in the future',
    }),
  missionName: z
    .string({ required_error: 'Mission name is required' })
    .min(5, 'Mission name must be at least 5 characters')
    .max(100, 'Mission name must be less than 100 characters'),
  rocketName: z
    .string({ required_error: 'Rocket name is required' })
    .min(5, 'Rocket name must be at least 5 characters')
    .max(100, 'Rocket name must be less than 100 characters'),
  planetName: z.string({ required_error: 'Destination planet is required' }),
});

export type LaunchFormValues = z.infer<typeof launchSchema>;

export const initialValues: LaunchFormValues = {
  launchDate: '',
  missionName: '',
  rocketName: '',
  planetName: '',
};
