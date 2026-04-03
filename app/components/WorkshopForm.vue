<script setup lang="ts">
import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'

const { t, locale } = useI18n()
const isLoading = ref(false)
const error = ref<string | null>(null)

const validationMessages = computed(() => ({
  nameMin: t('workshop.form.validation.nameMin'),
  emailInvalid: t('workshop.form.validation.emailInvalid'),
  required: t('workshop.form.validation.required')
}))

const workshopFormSchema = computed(() => z.object({
  name: z.string().min(2, validationMessages.value.nameMin),
  email: z.string().email(validationMessages.value.emailInvalid),
  workshopFor: z.string().optional(),
  skills: z.string().optional(),
  photographyStyle: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().optional()
}))

type WorkshopFormData = z.infer<ReturnType<typeof workshopFormSchema['value']>>

const zodPlugin = computed(() => createZodPlugin(workshopFormSchema.value))

const workshopForOptions = computed(() => [
  { label: t('workshop.form.fields.workshopFor.options.yourself'), value: 'yourself' },
  { label: t('workshop.form.fields.workshopFor.options.child'), value: 'child' },
  { label: t('workshop.form.fields.workshopFor.options.institution'), value: 'institution' }
])

const skillsOptions = computed(() => [
  { label: t('workshop.form.fields.skills.options.engineering'), value: 'engineering' },
  { label: t('workshop.form.fields.skills.options.darkroom'), value: 'darkroom' },
  { label: t('workshop.form.fields.skills.options.largeFormat'), value: 'largeFormat' }
])

const photographyStyleOptions = computed(() => [
  { label: t('workshop.form.fields.photographyStyle.options.landscape'), value: 'landscape' },
  { label: t('workshop.form.fields.photographyStyle.options.architecture'), value: 'architecture' },
  { label: t('workshop.form.fields.photographyStyle.options.nature'), value: 'nature' },
  { label: t('workshop.form.fields.photographyStyle.options.impressions'), value: 'impressions' },
  { label: t('workshop.form.fields.photographyStyle.options.other'), value: 'other' }
])

const handleSubmit = async (data: WorkshopFormData) => {
  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch('/api/contact/workshop', {
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
        type="radio"
        name="workshopFor"
        :label="$t('workshop.form.fields.workshopFor.label')"
        :options="workshopForOptions"
      />

      <FormKit
        type="radio"
        name="skills"
        :label="$t('workshop.form.fields.skills.label')"
        :options="skillsOptions"
      />

      <FormKit
        type="radio"
        name="photographyStyle"
        :label="$t('workshop.form.fields.photographyStyle.label')"
        :options="photographyStyleOptions"
      />

      <FormKit
        type="text"
        name="name"
        :placeholder="$t('workshop.form.fields.name.placeholder')"
        validation="required"
      >
        <template #label>
          <Icon name="mdi:account-outline" class="formkit-icon" />
          {{ $t('workshop.form.fields.name.label') }} <span class="formkit-required">*</span>
        </template>
      </FormKit>

      <FormKit
        type="email"
        name="email"
        :placeholder="$t('workshop.form.fields.email.placeholder')"
        validation="required|email"
      >
        <template #label>
          <Icon name="mdi:email-outline" class="formkit-icon" />
          {{ $t('workshop.form.fields.email.label') }} <span class="formkit-required">*</span>
        </template>
      </FormKit>

      <FormKit
        type="text"
        name="preferredDate"
        :placeholder="$t('workshop.form.fields.preferredDate.placeholder')"
      >
        <template #label>
          <Icon name="mdi:calendar-outline" class="formkit-icon" />
          {{ $t('workshop.form.fields.preferredDate.label') }}
        </template>
      </FormKit>

      <FormKit
        type="textarea"
        name="message"
        :placeholder="$t('workshop.form.fields.message.placeholder')"
        rows="4"
      >
        <template #label>
          <Icon name="mdi:note-text-outline" class="formkit-icon" />
          {{ $t('workshop.form.fields.message.label') }}
        </template>
      </FormKit>

      <FormKit
        type="submit"
        :label="isLoading ? $t('form.submitting') : $t('workshop.form.submit')"
        :disabled="isLoading"
      />
    </FormKit>

    <p class="contact-form__required-note">
      <span class="formkit-required">*</span> {{ $t('workshop.form.requiredNote') }}
    </p>
  </div>
</template>
