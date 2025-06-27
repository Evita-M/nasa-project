import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { initialValues, LaunchFormValues, launchSchema } from './schema';
import {
  Select,
  SelectContent,
  SelectItem,
  Label,
  SelectTrigger,
  SelectValue,
  ErrorMessage,
  CustomField,
} from '@/components/field';
import { Button } from '@/components/Button';
import { Planet } from '@/types/planet';

interface LaunchFormProps {
  onSubmit: (launch: LaunchFormValues) => Promise<void>;
  planets: Planet[];
}

export const LaunchForm = ({ onSubmit, planets }: LaunchFormProps) => (
  <Formik
    initialValues={initialValues}
    validationSchema={toFormikValidationSchema(launchSchema)}
    onSubmit={async (values, { resetForm }) => {
      await onSubmit(values);
      resetForm();
    }}
    validateOnBlur={true}
    validateOnChange={true}
  >
    {({ isSubmitting, errors, touched, resetForm }) => (
      <Form className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <CustomField
            label="Launch Date"
            id="launchDate"
            name="launchDate"
            type="date"
            min={new Date().toISOString()}
            max="2040-12-31"
          />
        </div>
        <div className="space-y-2">
          <CustomField
            label="Mission Name"
            id="missionName"
            name="missionName"
            type="text"
            placeholder="Enter mission name"
          />
        </div>
        <div className="space-y-2">
          <CustomField
            label="Rocket Type"
            id="rocketName"
            name="rocketName"
            type="text"
            placeholder="Enter rocket type"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="planetName" className="text-sm font-medium">
            Destination Exoplanet
          </Label>
          {!planets ? (
            <div className="text-sm text-white/70">Loading planets...</div>
          ) : planets.length === 0 ? (
            <div className="text-sm text-white/70">No planets available</div>
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
                    {planets?.map(({ keplerName }) => (
                      <SelectItem key={keplerName} value={keplerName}>
                        {keplerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
          )}
          {errors.planetName &&
            errors.planetName.length > 0 &&
            touched.planetName && <ErrorMessage message={errors.planetName} />}
        </div>
        <div className="col-span-1 flex items-end justify-end gap-4 md:col-span-2">
          <Button
            type="button"
            variant="outlined"
            onClick={() => resetForm()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Launching...' : 'Launch Mission'}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);
