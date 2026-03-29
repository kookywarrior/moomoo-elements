<template>
  <section
    class="bg-white h-fit max-h-full overflow-y-hidden rounded-lg shadow-(--shadow-bottom) py-5 pr-1.5 flex flex-col"
  >
    <div
      class="scroll-logic flex-1 overflow-y-auto overflow-x-visible pl-5 pr-1.5"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/main.css";

.scroll-logic {
  scrollbar-gutter: stable;
}

::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-(--scrollbar-thumb) rounded-3xl;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-(--scrollbar-thumb-hover);
}
</style>
