import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/Select';
import { Loader2 } from 'lucide-react';

interface Planet {
  kepler_name: string;
}

interface LaunchProps {
  planets?: Planet[];
  submitLaunch: (e: React.FormEvent<HTMLFormElement>) => void;
  isPendingLaunch: boolean;
  title: string;
  subtitle: string;
}

const Launch = ({
  planets,
  submitLaunch,
  isPendingLaunch,
  title,
  subtitle,
}: LaunchProps) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div id="launch">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg text-white/70">{subtitle}</p>
          <div className="p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">
              Only confirmed planets matching the following criteria are
              available for the earliest scheduled missions:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Planetary radius &lt; 1.6 times Earth's radius</li>
              <li>
                Effective stellar flux &gt; 0.36 times Earth's value and &lt;
                1.11 times Earth's value
              </li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={submitLaunch}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl"
        >
          <div className="space-y-2">
            <Label htmlFor="launch-day" className="text-sm font-medium">
              Launch Date
            </Label>
            <Input
              type="date"
              id="launch-day"
              name="launch-day"
              min={today}
              max="2040-12-31"
              defaultValue={today}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission-name" className="text-sm font-medium">
              Mission Name
            </Label>
            <Input
              type="text"
              id="mission-name"
              name="mission-name"
              className="w-full"
              placeholder="Enter mission name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rocket-name" className="text-sm font-medium">
              Rocket Type
            </Label>
            <Input
              type="text"
              id="rocket-name"
              name="rocket-name"
              defaultValue="Explorer IS1"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="planets-selector" className="text-sm font-medium">
              Destination Exoplanet
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a planet" />
              </SelectTrigger>
              <SelectContent>
                {planets?.map((planet) => (
                  <SelectItem
                    key={planet.kepler_name}
                    value={planet.kepler_name}
                  >
                    {planet.kepler_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center gap-4">
            <Button
              type="submit"
              disabled={isPendingLaunch}
              variant="contained"
            >
              {isPendingLaunch ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Launching...
                </>
              ) : (
                'Launch Mission'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Launch;
