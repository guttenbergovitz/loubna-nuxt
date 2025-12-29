<script setup lang="ts">
import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'

const { t } = useI18n()
const submitted = ref(false)

const simpleContactSchema = computed(() => z.object({
  name: z.string().min(2, t('contact.form.validation.nameMin')),
  email: z.string().email(t('contact.form.validation.emailInvalid')),
  message: z.string().min(10, t('contact.form.validation.messageMin'))
}))

type SimpleContactFormData = {
  name: string
  email: string
  message: string
}

const zodPlugin = computed(() => createZodPlugin(simpleContactSchema.value))

const handleSubmit = async (data: SimpleContactFormData) => {
  // TODO: Handle form submission (e.g., send to API)
  console.log('Simple contact form submitted:', data)
  submitted.value = true
}
</script>

<template>
  <div class="simple-contact-form">
    <div v-if="submitted" class="simple-contact-form__success">
      <p>{{ $t('contact.form.success') }}</p>
    </div>

    <FormKit
      v-else
      type="form"
      :plugins="[zodPlugin]"
      @submit="handleSubmit"
      :actions="false"
    >
      <FormKit
        type="text"
        name="name"
        :placeholder="$t('contact.form.fields.name.placeholder')"
        validation="required"
      >
        <template #label>
          <Icon name="mdi:account-outline" class="formkit-icon" />
          {{ $t('contact.form.fields.name.label') }}
        </template>
      </FormKit>

      <FormKit
        type="email"
        name="email"
        :placeholder="$t('contact.form.fields.email.placeholder')"
        validation="required|email"
      >
        <template #label>
          <Icon name="mdi:email-outline" class="formkit-icon" />
          {{ $t('contact.form.fields.email.label') }}
        </template>
      </FormKit>

      <FormKit
        type="textarea"
        name="message"
        :placeholder="$t('contact.form.fields.message.placeholder')"
        validation="required"
        rows="5"
      >
        <template #label>
          <Icon name="mdi:message-text-outline" class="formkit-icon" />
          {{ $t('contact.form.fields.message.label') }}
        </template>
      </FormKit>

      <FormKit
        type="submit"
        :label="$t('contact.form.submit')"
      />
    </FormKit>
  </div>
</template>
