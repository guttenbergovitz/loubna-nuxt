<script setup lang="ts">
import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'

const { t } = useI18n()
const submitted = ref(false)

const simpleContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

const zodPlugin = createZodPlugin(simpleContactSchema)

const handleSubmit = async (data: z.infer<typeof simpleContactSchema>) => {
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
        :label="$t('contact.form.fields.name.label')"
        :placeholder="$t('contact.form.fields.name.placeholder')"
        validation="required"
      />

      <FormKit
        type="email"
        name="email"
        :label="$t('contact.form.fields.email.label')"
        :placeholder="$t('contact.form.fields.email.placeholder')"
        validation="required|email"
      />

      <FormKit
        type="textarea"
        name="message"
        :label="$t('contact.form.fields.message.label')"
        :placeholder="$t('contact.form.fields.message.placeholder')"
        validation="required"
        rows="5"
      />

      <FormKit
        type="submit"
        :label="$t('contact.form.submit')"
      />
    </FormKit>
  </div>
</template>
