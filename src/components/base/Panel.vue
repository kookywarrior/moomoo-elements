<template>
  <section
    class="bg-white h-fit max-h-full overflow-hidden shadow-(--shadow-bottom) rounded-lg p-4 flex flex-col"
  >
    <div class="flex-1 overflow-auto *:mb-4 [&>*:last-child]:mb-1">
      <slot />
    </div>
  </section>
</template>
