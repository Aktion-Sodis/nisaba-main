<template>
  <Toast position="bottom-right">
    <template #message="slotProps">
      <div class="flex items-start w-full space-x-3 pl-1 py-2 pr-2">
        <div>
          <i
            v-if="slotProps.message.severity === 'success'"
            class="pi pi-check-circle text-green-500 text-2xl"
          />
          <i
            v-else-if="slotProps.message.severity === 'info'"
            class="pi pi-info-circle text-blue-500 text-2xl"
          />
          <i
            v-else-if="slotProps.message.severity === 'warn'"
            class="pi pi-exclamation-triangle text-yellow-500 text-2xl"
          />
          <i
            v-else-if="slotProps.message.severity === 'error'"
            class="pi pi-times-circle text-red-500 text-2xl"
          />
          <i v-else class="pi pi-info-circle text-gray-500 text-2xl" />
        </div>

        <div class="flex flex-col flex-auto -mt-1.5">
          <div class="font-medium text-lg">
            {{ slotProps.message.summary }}
          </div>
          <div class="text-sm mt-1" v-html="slotProps.message.detail" />
        </div>
      </div>
    </template>
  </Toast>
</template>
