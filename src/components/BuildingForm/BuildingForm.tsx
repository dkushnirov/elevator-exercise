import { FieldErrors, useForm } from 'react-hook-form';

import {
  ButtonsRow,
  Container,
  ErrorMessage,
  Input,
  InputLabel,
  Row,
} from './BuildingForm.styles';
import { BuildingFormData } from '../../types/building';
import Button from '../../sharedComponents/Button/Button';

type BuildingFormProps = {
  defaultData: BuildingFormData;
  onSubmit: (formData: BuildingFormData) => void;
};

type FieldErrorMessages = Record<string, string>;

type ErrorsMessages = Record<string, FieldErrorMessages>;

const MAX_LENGTH = 120;
const NAME_PATTERN = /^[A-Za-z0-9\s]+$/i;
const MIN_NUMBER_OF_FLOORS = 4;
const MAX_NUMBER_OF_FLOORS = 100;
const MIN_NUMBER_OF_ELEVATORS = 1;
const MAX_NUMBER_OF_ELEVATORS = 4;

const errorsMessages: ErrorsMessages = {
  buildingName: {
    required: 'Building Name is required',
    pattern: 'Building name can only contain letters, numbers, and spaces',
  },
  numberOfFloors: {
    required: 'Number Of Floors is required',
    min: `Number of floors must be between ${MIN_NUMBER_OF_FLOORS} and ${MAX_NUMBER_OF_FLOORS}`,
    max: `Number of floors must be between ${MIN_NUMBER_OF_FLOORS} and ${MAX_NUMBER_OF_FLOORS}`,
  },
  numberOfElevators: {
    required: 'Number Of Elevators is required',
    min: `Number of elevators must be between ${MIN_NUMBER_OF_ELEVATORS} and ${MAX_NUMBER_OF_ELEVATORS}`,
    max: `Number of elevators must be between ${MIN_NUMBER_OF_ELEVATORS} and ${MAX_NUMBER_OF_ELEVATORS}`,
  },
};

const getErrorsMessages = (errors: FieldErrors<BuildingFormData>) => {
  return Object.entries(errors).map(([key, value]) => (
    <div key={key + value.type}>
      {value.type && typeof value.type === 'string'
        ? errorsMessages[key]?.[value.type]
        : ''}
    </div>
  ));
};

function BuildingForm({ defaultData, onSubmit }: BuildingFormProps) {
  const {
    register,
    // setError,
    handleSubmit,
    formState: { errors },
  } = useForm<BuildingFormData>();

  return (
    <Container>
      <h2>Building Information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <InputLabel>Building Name:</InputLabel>
          <Input
            type="text"
            defaultValue={defaultData.buildingName}
            {...register('buildingName', {
              required: true,
              maxLength: MAX_LENGTH,
              pattern: NAME_PATTERN,
            })}
          />
        </Row>
        <Row>
          <InputLabel>Number of Floors:</InputLabel>
          <Input
            type="number"
            defaultValue={defaultData.numberOfFloors}
            {...register('numberOfFloors', {
              required: true,
              min: MIN_NUMBER_OF_FLOORS,
              max: MAX_NUMBER_OF_FLOORS,
            })}
          />
        </Row>
        <Row>
          <InputLabel>Number of Elevators:</InputLabel>
          <Input
            type="number"
            defaultValue={defaultData.numberOfElevators}
            {...register('numberOfElevators', {
              required: true,
              min: MIN_NUMBER_OF_ELEVATORS,
              max: MAX_NUMBER_OF_ELEVATORS,
            })}
          />
        </Row>

        <ErrorMessage>{getErrorsMessages(errors)}</ErrorMessage>

        <ButtonsRow>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </ButtonsRow>
      </form>
    </Container>
  );
}

export default BuildingForm;
