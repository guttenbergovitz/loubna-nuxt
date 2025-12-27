<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod'
import { createContactFormSchema, type ContactFormData } from '~/schemas/contactForm'

const { t } = useI18n()
const submitted = ref(false)

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
  // TODO: Handle form submission (e.g., send to API)
  console.log('Form submitted:', data)
  submitted.value = true
}
</script>

<template>
  <div class="contact-form">
    <div v-if="submitted" class="contact-form__success">
      <p>{{ $t('bookCall.form.success') }}</p>
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
        :label="$t('bookCall.form.fields.name.label')"
        :placeholder="$t('bookCall.form.fields.name.placeholder')"
        validation="required"
      />

      <FormKit
        type="email"
        name="email"
        :label="$t('bookCall.form.fields.email.label')"
        :placeholder="$t('bookCall.form.fields.email.placeholder')"
        validation="required|email"
      />

      <FormKit
        type="tel"
        name="phone"
        :label="$t('bookCall.form.fields.phone.label')"
        :placeholder="$t('bookCall.form.fields.phone.placeholder')"
        validation="required"
      />

      <FormKit
        type="select"
        name="lookingFor"
        :label="$t('bookCall.form.fields.lookingFor.label')"
        :placeholder="$t('bookCall.form.fields.lookingFor.placeholder')"
        :options="lookingForOptions"
      />

      <FormKit
        type="select"
        name="photographyStyle"
        :label="$t('bookCall.form.fields.photographyStyle.label')"
        :placeholder="$t('bookCall.form.fields.photographyStyle.placeholder')"
        :options="photographyStyleOptions"
      />

      <FormKit
        type="submit"
        :label="$t('bookCall.form.submit')"
      />
    </FormKit>
  </div>
</template>
