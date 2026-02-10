<template>
    <header id="navbar" class="w-full hidden lg:flex flex-col">
      <nav class="w-full flex justify-between border-bot">
        <github-corner url="https://github.com/nakadp" />
          <div class="flex">
            <NuxtLink id="nav-logo" to="/">
              {{ config.logo_name }}
            </NuxtLink>

            <NuxtLink id="nav-link" to="/" :class="{ active: isActive('/') }">
              _hello
            </NuxtLink>
  
            <NuxtLink id="nav-link" to="/about-me" :class="{ active: isActive('/about-me') }">
              _about-me
            </NuxtLink>
  
            <NuxtLink id="nav-link" to="/projects" :class="{ active: isActive('/projects') }">
              _projects
            </NuxtLink>

            <NuxtLink id="nav-link" to="/activity" :class="{ active: isActive('/activity') }">
              _activity
            </NuxtLink>
          </div>

          <NuxtLink id="nav-link-contact" to="/contact-me" :class="{ active: isActive('/contact-me')}">
            _contact-me
          </NuxtLink>
      
      </nav>

    </header>

</template>

<script setup>
import GithubCorner from './GithubCorner.vue';
import config from '~/developer.json';

const isActive = (route) => {
  return route === route;
}

</script>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style>

/* Header Glass Effect */
#navbar {
  background: rgba(1, 22, 39, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(67, 217, 173, 0.1);
}

#nav-link {
  border-right: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 h-full flex items-center;
  transition: all 0.2s ease-out;
  position: relative;
}

#nav-link-contact {
  border-left: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 h-full flex items-center;
  transition: all 0.2s ease-out;
  position: relative;
}

#nav-link:hover, #nav-link-contact:hover {
  background-color: rgba(67, 217, 173, 0.08);
  color: white;
}

/* Active indicator glow */
#nav-link::after, #nav-link-contact::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #43D9AD, transparent);
  transform: translateX(-50%);
  transition: width 0.3s ease-out;
}

#nav-link:hover::after, #nav-link-contact:hover::after {
  width: 80%;
}

#nav-logo {
  border-right: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 h-full flex items-center;
  transition: all 0.2s ease-out;
}

#nav-logo:hover {
  background-color: rgba(67, 217, 173, 0.08);
  color: #43D9AD;
}

#nav-link.router-link-active, #nav-link-contact.router-link-active {
  border-bottom: 2px solid #FEA55F;
  color: white;
}

#nav-logo.router-link-active {
  border-right: 1px solid #1E2D3D;
  border-bottom: none;
  @apply text-menu-text;
}

#navbar > nav {
  height: 45px;
  font-size: 13px;
}

</style>

