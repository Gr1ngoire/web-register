<script setup lang="ts">
import { Button } from "@/common/components/components";
import type {
  ToggleState,
  GrantsGetAllItemAdminResponseDto,
} from "@/common/types/types";
import { reactive, useStore } from "@/hooks/hooks";
import { AdministrationActions } from "@/store/actions";
import { UpdateGrantForm } from "./components/components";

import styles from "./styles.module.scss";

type Props = {
  fullName: string;
  grantRecord: GrantsGetAllItemAdminResponseDto;
};

const props = defineProps<Props>();

const store = useStore();

const handleDeletion = (): void => {
  store.dispatch(AdministrationActions.DELETE_GRANT, props.grantRecord.id);
};

const initialFormShowState: ToggleState = { state: false };
const grantUpdateFormShowState = reactive<ToggleState>(initialFormShowState);
const handleEditToggle: () => void = (): void => {
  grantUpdateFormShowState.state = !grantUpdateFormShowState.state;
};
</script>

<template>
  <UpdateGrantForm
    v-if="grantUpdateFormShowState.state"
    :initialGrant="grantRecord"
    :onToggle="handleEditToggle"
  />
  <div v-else-if="!grantUpdateFormShowState.state" :class="styles.grantCard">
    <p :class="styles.grantFullName">Full name: {{ fullName }}</p>
    <p :class="styles.grantEmail">Email: {{ grantRecord.user.email }}</p>
    <p :class="styles.grantPhone">Phone: {{ grantRecord.user.phone }}</p>
    <p :class="styles.grantGrantName">Grant: {{ grantRecord.grant }}</p>
    <p :class="styles.grantGrantedBy">
      Granted by:
      {{ grantRecord.granter ? grantRecord.granter.name : "Initial" }}
    </p>
    <div :class="styles.actionsSection">
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="edit" :onClick="handleEditToggle" />
      </div>
      <div :class="styles.actionWrapperButton">
        <Button type="click" action="delete" :onClick="handleDeletion" />
      </div>
    </div>
  </div>
</template>
