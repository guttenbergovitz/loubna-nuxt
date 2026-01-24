<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod'
import { createContactFormSchema, type ContactFormData } from '~/schemas/contactForm'

const { t, locale } = useI18n()
const isLoading = ref(false)
const error = ref<string | null>(null)

const validationMessages = computed(() => ({
  nameMin: t('bookCall.form.validation.nameMin'),
  emailInvalid: t('bookCall.form.validation.emailInvalid'),
  phoneMin: t('bookCall.form.validation.phoneMin'),
  required: t('bookCall.form.validation.required')
}))

const contactFormSchema = computed(() => createContactFormSchema(validationMessages.value))
const zodPlugin = computed(() => createZodPlugin(contactFormSchema.value))

const lookingForOptions = computed(() => [
  { label: t('bookCall.form.fields.lookingFor.options.businessGift'), value: 'businessGift' },
  { label: t('bookCall.form.fields.lookingFor.options.fineArtPrint'), value: 'fineArtPrint' },
  { label: t('bookCall.form.fields.lookingFor.options.customPhotography'), value: 'customPhotography' }
])

const photographyStyleOptions = computed(() => [
  { label: t('bookCall.form.fields.photographyStyle.options.landscape'), value: 'landscape' },
  { label: t('bookCall.form.fields.photographyStyle.options.architecture'), value: 'architecture' },
  { label: t('bookCall.form.fields.photographyStyle.options.nature'), value: 'nature' },
  { label: t('bookCall.form.fields.photographyStyle.options.impressions'), value: 'impressions' },
  { label: t('bookCall.form.fields.photographyStyle.options.other'), value: 'other' }
])

const handleSubmit = async (data: ContactFormData) => {
  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch('/api/contact/book-call', {
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
  <div class="contact-form">
    <div v-if="error" class="contact-form__error">
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
        :placeholder="$t('bookCall.form.fields.name.placeholder')"
        validation="required"
      >
        <template #label>
          <Icon name="mdi:account-outline" class="formkit-icon" />
          {{ $t('bookCall.form.fields.name.label') }}
        </template>
      </FormKit>

      <FormKit
        type="email"
        name="email"
        :placeholder="$t('bookCall.form.fields.email.placeholder')"
        validation="required|email"
      >
        <template #label>
          <Icon name="mdi:email-outline" class="formkit-icon" />
          {{ $t('bookCall.form.fields.email.label') }}
        </template>
      </FormKit>

      <FormKit
        type="tel"
        name="phone"
        :placeholder="$t('bookCall.form.fields.phone.placeholder')"
        validation="required"
      >
        <template #label>
          <Icon name="mdi:phone-outline" class="formkit-icon" />
          {{ $t('bookCall.form.fields.phone.label') }}
        </template>
      </FormKit>

      <FormKit
        type="radio"
        name="lookingFor"
        :label="$t('bookCall.form.fields.lookingFor.label')"
        :options="lookingForOptions"
      />

      <FormKit
        type="radio"
        name="photographyStyle"
        :label="$t('bookCall.form.fields.photographyStyle.label')"
        :options="photographyStyleOptions"
      />

      <FormKit
        type="textarea"
        name="additionalNotes"
        :placeholder="$t('bookCall.form.fields.additionalNotes.placeholder')"
        rows="4"
      >
        <template #label>
          <Icon name="mdi:note-text-outline" class="formkit-icon" />
          {{ $t('bookCall.form.fields.additionalNotes.label') }}
        </template>
      </FormKit>

      <FormKit
        type="submit"
        :label="isLoading ? $t('form.submitting') : $t('bookCall.form.submit')"
        :disabled="isLoading"
      />
    </FormKit>
  </div>
</template>
