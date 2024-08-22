<script setup>
import { navMenu } from '../../../constants/index'

const { toggleFullMenu, isShowFullMenu } = useToggleMenu()
</script>

<template>
  <div class="fullscreen-menu" :class="{ open: isShowFullMenu }">
    <nav class="main-nav">
      <div class="flex-end w-full flex items-center justify-end" sm="px-[20px]" xl="py-[20px] px-[0]">
        <button class="btn-hamburger-close" @click="toggleFullMenu">
          <NuxtIcon name="heroicons:x-mark" class="text-white" />
        </button>
      </div>
      <ul v-if="navMenu">
        <li v-for="menuItem in navMenu" :key="menuItem">
          <NuxtLink :to="{ path: menuItem.path }" @click="toggleFullMenu">
            {{ menuItem.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped lang="postcss">
.fullscreen-menu {
  background: #23030a47;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  height: 100%;
  left: 0;
  opacity: 0;
  overflow: hidden;
  position: fixed;
  text-align: center;
  top: 0px;
  transition: all 0.7s ease-in-out;
  visibility: hidden;
  width: 100%;
  z-index: 99999;

  &.open {
    opacity: 1;
    visibility: visible;

    @for $i from 1 through 10 {
      li:nth-child(#{$i}) {
        animation-delay: $i * 0.1s;
      }
    }

    li {
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: fadeInUp;
    }
  }

  .btn-hamburger-close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 1111;
    border: 2px solid white;
    vertical-align: middle;
    background: transparent;
    transition: all 0.3s ease;
    align-self: flex-end;
    &:hover {
      background-color: #fff;
      .iconify {
        color: #3a0912e0;
      }
    }
  }
  ul {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    justify-content: space-evenly;
    &:hover {
      a {
        opacity: 0.5;
      }
    }

    a {
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      transition: opacity 0.3s ease-in-out;

      &:hover {
        opacity: 1;
      }
    }
  }

  .main-nav {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    max-width: 1247px;
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    flex-flow: column;
    height: 100%;
    align-items: center;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      color: #ffffff;
      display: block;
      font-size: 2.5rem;
      font-weight: bold;
      padding: 1rem 1rem;
      text-decoration: none;
      text-transform: uppercase;

      &:first {
        padding-top: 0;
      }
    }
  }

  .menu-footer {
    padding: 2rem;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;

    ul {
      display: inline-block;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: inline;
        margin: 0 1rem;
      }
    }

    a {
      color: #ffffff;
      text-decoration: none;
      text-transform: uppercase;
    }
  }
}

.toggle-menu {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  height: 50px;
  outline: none;
  padding: 0;
  pointer-events: initial;
  position: relative;
  vertical-align: middle;
  width: 50px;
  z-index: 1110;

  span {
    background-color: #fff;
    content: '';
    display: block;
    height: 2px;
    left: calc(50% - 13px);
    position: absolute;
    top: calc(50% - 1px);
    transform-origin: 50% 50%;
    transition:
      background-color 0.2s ease-in-out,
      top 0.2s 0.2s ease-out,
      transform 0.2s linear;
    width: 26px;

    &:before,
    &:after {
      background-color: #fff;
      content: '';
      display: block;
      height: 2px;
      position: absolute;
      transform-origin: 50% 50%;
      transition:
        background-color 0.2s ease-in-out,
        top 0.2s 0.2s ease-out,
        transform 0.2s linear;
      width: 26px;
    }

    &:before {
      top: 7px;
    }

    &:after {
      top: -7px;
    }
  }

  &.active {
    span {
      background-color: transparent;
      transition: background 0.2s ease-out;

      &:before,
      &:after {
        transition:
          top 0.2s ease-out,
          transform 0.2s 0.2s ease-out;
      }

      &:before {
        top: 0;
        transform: rotate3d(0, 0, 1, -45deg);
      }

      &:after {
        top: 0;
        transform: rotate3d(0, 0, 1, 45deg);
      }
    }
  }
}
</style>
