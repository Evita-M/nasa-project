import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateLaunchSubtitle(upcomingCount: number) {
  switch (upcomingCount) {
    case 0:
      return "Currently you have no launches. Let's change that!";
    case 1:
      return 'There is 1 mission awaiting liftoff. Set up your next adventure by choosing a date, time, and destination.';
    case 2:
    case 3:
    case 4:
    case 5:
      return `There are ${upcomingCount} missions scheduled. Plan your next journey by picking a date, time, and planet.`;
    default:
      return `Wow, good job! You have ${upcomingCount} missions scheduled. Keep exploring new worlds!`;
  }
}
