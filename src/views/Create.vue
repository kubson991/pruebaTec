<script setup lang="ts">
import { reactive, ref ,computed} from "vue";
import { useRouter } from "vue-router";
import { usePaymentOrdersStore } from "@/stores/payment-orders.store";
import {paymentOrderStatus} from "@/types/payment-order.types";

const paymentOrdersStore = usePaymentOrdersStore();

const router = useRouter();

const form = reactive({
  supplier: "",
  amount: "",
  concept: "",
});

const fields = [
  {
    key: 'supplier' as keyof typeof form,
    label: 'Proveedor',
    icon: 'home_work',
    type: 'text',
    required: true,
  },
  {
    key: 'amount' as keyof typeof form,
    label: 'Monto',
    icon: 'attach_money',
    type: 'number',
    required: true,
  },
  {
    key: 'concept' as keyof typeof form,
    label: 'Concepto',
    icon: 'info',
    type: 'text',
    required: true,
    max: 250,
  },
]


const submit = () => {
    const date = new Date().toISOString().split('T')[0]
    paymentOrdersStore.createPaymentOrderAction({
        supplierName: form.supplier,
        amount: parseFloat(form.amount),
        concept: form.concept,
        status:paymentOrderStatus.DRAFT,
        createdAt:date,
    });
    router.push("/");
};


const canSubmit = computed(() => {
  return (
    getBoilerPlateForValidations(form.supplier, true).isValid &&
    getBoilerPlateForValidations(form.amount, true).isValid &&
    getBoilerPlateForValidations(form.concept, true, 250).isValid
  );
});

const validate = (key: string, value: string) => {
  const field = fields.find(f => f.key === key)

  return getBoilerPlateForValidations(
    value,
    field?.required ?? false,
    field?.max
  )
}

const getBoilerPlateForValidations = (value:string,required:boolean,max?:number) => {
    const isValid = required ? (value+'').trim() !== "" : true;
    const isMaxValid = max ? value.length <= max : true;
    return {
        isValid: isValid && isMaxValid,
        errorMessage: !isValid
        ? "Este campo es obligatorio"
        : !isMaxValid
        ? `El valor no debe exceder los ${max} caracteres`
        : "",
    };
};
</script>
<template>
  <section class="view">
    <h1 class="h2 sm:h1">Crear orden</h1>
    <form @submit.prevent="submit" >
        <div
        v-for="field in fields"
        :key="field.key"
        class="inputContainer"
      >
        <div
          class="ginko-input"
          :class="{
            error: !validate(field.key, form[field.key]).isValid,
            success: validate(field.key, form[field.key]).isValid
          }"
        >
          <label>{{ field.label }}</label>
      
          <span class="material-symbols-rounded">
            {{ field.icon }}
          </span>
      
          <input
            :type="field.type"
            v-model="form[field.key]"
          />
        </div>
      
        <span v-show="validate(field.key, form[field.key]).errorMessage">
          {{ validate(field.key, form[field.key]).errorMessage }}
        </span>
      </div>
      <div class="buttonContainer">
        <button class="ginko-button" :disabled="!canSubmit">
            Crear
          </button>
      </div>

    </form>
  </section>
</template>
<style scoped lang="scss" >
@use "../styles/responsive.scss" as *;

.view {
  color: var(--blue-900);
  padding: 2rem;
}
form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @include min(sm){
    margin-top: 8rem;
  }

  .inputContainer {
    flex:1;
    min-height: 7.4rem;
}
.buttonContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    @include min(sm){
        margin-top: 4rem;
      }
    button{
        width: 20rem;
    }
}
}
</style>
