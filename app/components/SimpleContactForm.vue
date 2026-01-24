<script setup lang="ts">
import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'

const { t, locale } = useI18n()
const isLoading = ref(false)
const error = ref<string | null>(null)

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
  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch('/api/contact/simple', {
      method: 'POST',
      body: {
        ...data,
        locale: locale.value
      }
    })

    if (response.success && response.redirectUrl) {
      await navigateTo(response.redirectUrl)
    } else {
      error.value = t('form.error.sendFailed')
    }
  } catch (err) {
    console.error('Form submission error:', err)
    error.value = t('form.error.sendFailed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="simple-contact-form">
    <div v-if="error" class="simple-contact-form__error">
      <p>{{ error }}</p>
    </div>

    <FormKit
      type="form"
      :plugins="[zodPlugin]"
      @submit="handleSubmit"
      :actions="false"
      :disabled="isLoading"
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
        :label="isLoading ? $t('form.submitting') : $t('contact.form.submit')"
        :disabled="isLoading"
      />
    </FormKit>
  </div>
</template>
