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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { launchSchema } from '../schemas/launch';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import toast from 'react-hot-toast';

interface Planet {
  name: string;
}

interface LaunchProps {
  planets?: Planet[];
  submitLaunch: (values: {
    launchDate: Date;
    mission: string;
    rocket: string;
    destination: string;
  }) => Promise<void>;
  title: string;
  subtitle: string;
}

const Launch = ({ planets, submitLaunch, title, subtitle }: LaunchProps) => {
  const today = new Date().toISOString().split('T')[0];

  const initialValues = {
    launchDate: today,
    missionName: '',
    rocketName: 'Explorer IS1',
    planetName: '',
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await submitLaunch({
        launchDate: new Date(values.launchDate),
        mission: values.missionName,
        rocket: values.rocketName,
        destination: values.planetName,
      });
      toast.success('Mission scheduled successfully! 🚀');
      resetForm();
    } catch (error) {
      toast.error('Failed to schedule mission. Please try again.');
    }
  };

  const ErrorMessageComponent = ({ name }: { name: string }) => (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {msg}
        </div>
      )}
    />
  );

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

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(launchSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="launchDate" className="text-sm font-medium">
                  Launch Date
                </Label>
                <Field
                  as={Input}
                  type="date"
                  id="launchDate"
                  name="launchDate"
                  min={today}
                  max="2040-12-31"
                  className="w-full"
                />
                <ErrorMessageComponent name="launchDate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="missionName" className="text-sm font-medium">
                  Mission Name
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="missionName"
                  name="missionName"
                  placeholder="Enter mission name"
                  className="w-full"
                />
                <ErrorMessageComponent name="missionName" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rocketName" className="text-sm font-medium">
                  Rocket Type
                </Label>
                <Field
                  as={Input}
                  type="text"
                  id="rocketName"
                  name="rocketName"
                  className="w-full"
                />
                <ErrorMessageComponent name="rocketName" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planetName" className="text-sm font-medium">
                  Destination Exoplanet
                </Label>
                {!planets ? (
                  <div className="text-sm text-white/70">
                    Loading planets...
                  </div>
                ) : planets.length === 0 ? (
                  <div className="text-sm text-white/70">
                    No planets available
                  </div>
                ) : (
                  <Field name="planetName">
                    {({ field, form }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue('planetName', value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a planet" />
                        </SelectTrigger>
                        <SelectContent>
                          {planets.map(({ name }) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                )}
                <ErrorMessageComponent name="planetName" />
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Launching...' : 'Launch Mission'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => resetForm()}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Launch;
