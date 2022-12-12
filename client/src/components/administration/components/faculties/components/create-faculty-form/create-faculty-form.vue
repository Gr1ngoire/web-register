<script lang="ts" setup>
import { Button, Input } from "@/common/components/components";
import type { CreateFacultyRequestDto } from "@/common/types/types";
import type { ValidationError } from "@/exceptions/exceptions";
import { faculty as facultyValidator } from "@/validators/validators";
import { reactive, useStore } from "@/hooks/hooks";
import { FacultiesActions } from "@/store/actions.common";

import styles from "./styles.module.scss";

type Props = {
  onToggle: () => void;
};

const props = defineProps<Props>();

let facultyCreationFormState: CreateFacultyRequestDto =
  reactive<CreateFacultyRequestDto>({
    name: "",
    shortName: "",
  });

const facultyCreationValidationState: Record<string, string> = reactive<
  Record<string, string>
>({
  name: "",
  shortName: "",
});

const handleFacultyCreationValidation: (
  faculty: CreateFacultyRequestDto
) => void = (faculty: CreateFacultyRequestDto): void => {
  try {
    facultyValidator.validate(faculty);
  } catch (err: unknown) {
    const validationError = err as ValidationError;
    facultyCreationValidationState[validationError.field] =
      validationError.message;
  }
};

const handleFacultyPropertyChange: (event: Event) => void = (
  event: Event
): void => {
  const input = event.target as HTMLInputElement;
  facultyCreationFormState = {
    ...facultyCreationFormState,
    [input.name]: input.value,
  } as CreateFacultyRequestDto;

  facultyCreationValidationState[input.name] = "";
  handleFacultyCreationValidation(facultyCreationFormState);

  console.log(facultyCreationValidationState);
};

const store = useStore();

const handleSubmit: (event: Event) => void = (event: Event) => {
  event.preventDefault();
  if (
    Object.values(facultyCreationValidationState).every((el) => el.length === 0)
  ) {
    store.dispatch(FacultiesActions.CREATE_FACULTY, facultyCreationFormState);
    props.onToggle();
  }
};

handleFacultyCreationValidation(facultyCreationFormState);
</script>

<template>
  <form :class="styles.facultyCreationForm" @submit="handleSubmit">
    <Input
      type="text"
      name="name"
      :onInput="handleFacultyPropertyChange"
      :errorMessage="facultyCreationValidationState.name"
    />
    <Input
      type="text"
      name="shortName"
      :onInput="handleFacultyPropertyChange"
      :errorMessage="facultyCreationValidationState.shortName"
    />
    <div :class="styles.facultyCreationFormActionSection">
      <Button type="submit" name="Add" action="submit" />
      <Button type="click" name="Cancel" action="cancel" :onClick="onToggle" />
    </div>
  </form>
</template>