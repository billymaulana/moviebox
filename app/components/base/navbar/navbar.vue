<script setup lang="ts">
const isFocused = ref(false)
const { toggleFullMenu } = useToggleMenu()
</script>

<template>
  <header>
    <div class="navbar" sm="max-h-[120px] px-[20px]" lg="max-h-[80px]">
      <nav class="container">
        <div class="row items-center justify-between">
          <div class="navbar-brand">
            <a class="navbar-brand" href="/">
              <img src="/moviebox-logo.svg" alt="logo MovieBox" class="sm:hidden md:flex">
              <img src="/tv.svg" alt="logo MovieBox" class="md:hidden sm:flex">
            </a>
          </div>
          <form class="form-search" sm="order-3 my-[10px]" md="order-2 max-w-[300px]" lg="max-w-[350px]" :class="{ focused: isFocused }">
            <div class="form-container">
              <input
                class="form-search-input" type="search" placeholder="What do you want to watch?"
                aria-label="Search" @focus="isFocused = true" @blur="isFocused = false"
              >
              <button class="btn-search">
                <NuxtIcon name="heroicons-solid:search" size="1rem" />
              </button>
            </div>
          </form>
          <div class="flex items-center gap-[24px]" sm="order-2 my-[15px]" md="order-2">
            <NuxtLink to=" /login">
              Sign In
            </NuxtLink>
            <button class="btn-hamburger" sm="right-[20px]" @click="toggleFullMenu">
              <NuxtIcon name="heroicons-solid:menu-alt-4" />
            </button>
          </div>
        </div>
      </nav>
    </div>
    <BaseMenu />
  </header>
</template>

<style scoped lang="postcss">
.navbar {
  @apply flex fixed items-center justify-between w-full h-full overflow-hidden z-[999] text-white;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  background: hsla(0, 0%, 100%, 0.05);
  box-shadow: 0 4px 32px #00000008;
  transition: all 0.2s ease-in-out;
  .btn-hamburger {
    @apply bg-rose-700 flex items-center justify-center w-[2.25rem] h-[2.25rem] rounded-full;
  }
}
.form-search {
  @apply relative flex flex-[1 1 auto] text-white w-full md:max-w-[250px] xl:max-w-[525px];
  border: 1px solid #d1d5dc;
  border-radius: 6px;
  transition: all 0.3s ease;
  &.focused {
    border: 1px solid #ffffff;
  }

  .form-container {
    @apply relative w-full flex flex-grow items-center overflow-hidden;
    [type='search'],
    .form-search-input {
      @apply border-0 text-white flex;
      background-color: transparent;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      flex-basis: 100%;
      max-width: 525px;
      height: 100%;
      padding: 6px 10px;
      border-radius: 6px;
      outline: 0;
      appearance: textfield;
      -webkit-appearance: textfield;
      outline-offset: -2px;
      &:focus,
      &:focus-within,
      &:focus-visible,
      &:-webkit-autofill,
      &:autofill {
        outline: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none;
        color: white;
        ~ .btn-search .iconify {
          color: white;
        }
        &::placeholder {
          color: white;
        }
      }
      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
        height: 16px;
        width: 16px;
        background-size: 16px 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23ffffff' fill-rule='evenodd' d='M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10L4.293 5.707a1 1 0 0 1 0-1.414' clip-rule='evenodd'/%3E%3C/svg%3E");
        &:hover {
          cursor: pointer;
        }
      }
      &::placeholder {
        font-size: 16px;
        color: #d1d5dc;
      }
    }
    .btn-search {
      padding: 6px 10px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconify {
        color: #d1d5dc;
      }
    }
  }
}
</style>
