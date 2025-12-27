<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod'
import { contactFormSchema, type ContactFormData } from '~/schemas/contactForm'

const { t } = useI18n()
const submitted = ref(false)

const zodPlugin = createZodPlugin(contactFormSchema)

const lookingForOptions = computed(() => [
  { label: t('contact.form.fields.lookingFor.options.businessGift'), value: 'businessGift' },
  { label: t('contact.form.fields.lookingFor.options.fineArtPrint'), value: 'fineArtPrint' },
  { label: t('contact.form.fields.lookingFor.options.customPhotography'), value: 'customPhotography' }
])

const photographyStyleOptions = computed(() => [
  { label: t('contact.form.fields.photographyStyle.options.landscape'), value: 'landscape' },
  { label: t('contact.form.fields.photographyStyle.options.architecture'), value: 'architecture' },
  { label: t('contact.form.fields.photographyStyle.options.nature'), value: 'nature' },
  { label: t('contact.form.fields.photographyStyle.options.impressions'), value: 'impressions' },
  { label: t('contact.form.fields.photographyStyle.options.other'), value: 'other' }
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
        type="tel"
        name="phone"
        :label="$t('contact.form.fields.phone.label')"
        :placeholder="$t('contact.form.fields.phone.placeholder')"
        validation="required"
      />

      <FormKit
        type="select"
        name="lookingFor"
        :label="$t('contact.form.fields.lookingFor.label')"
        :placeholder="$t('contact.form.fields.lookingFor.placeholder')"
        :options="lookingForOptions"
      />

      <FormKit
        type="select"
        name="photographyStyle"
        :label="$t('contact.form.fields.photographyStyle.label')"
        :placeholder="$t('contact.form.fields.photographyStyle.placeholder')"
        :options="photographyStyleOptions"
      />

      <FormKit
        type="submit"
        :label="$t('contact.form.submit')"
      />
    </FormKit>
  </div>
</template>
