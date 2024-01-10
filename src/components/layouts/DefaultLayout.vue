<template>
  <main class="layout">
    <header class="layout__header">
  <slot name="header">
    <div class="layout__header__logo">
      <router-link to="/" ><img src="@/assets/Tik-Tak.svg" alt="logo" /></router-link>
    </div>
    <div class="layout__header__menu">
      <ul class="layout__header__menu__menuitem">
        <li class="layout__header__menu__menuitem__element">
          <router-link to="/">Home</router-link>
        </li>
        <li class="layout__header__menu__menuitem__element">
          <router-link to="/about">About</router-link>
        </li>
        <li class="layout__header__menu__menuitem__element">
          <router-link to="/contact">Contact</router-link>
        </li>
        <li class="layout__header__menu__menuitem__element">
          <router-link class="layout__header__menu__menuitem__element__login" to="/login">Login</router-link>
        </li>
        <li class="layout__header__menu__menuitem__element">
          <router-link class="layout__header__menu__menuitem__element" to="/cart"><MyIcon type="icon"  class="layout__header__menu__menuitem__element__icon"/></router-link>
        </li>
      </ul>
    </div>
  </slot>
</header>
    <article class="layout__article">
      <slot>
        <AsideLayout/>
      </slot>
    </article>
    <footer class="layout__footer">
      <slot name="footer">
        <img class="layout__footer__logo" src="@/assets/Tik-Tak.svg" alt="logo" />
        <div class="layout__footer__social">
          <MyIcon class="layout__footer__social__icon" name="Facebook"/>
          <MyIcon  class="layout__footer__social__icon" name="Instagram"/>
          <MyIcon  class="layout__footer__social__icon" name="Twitter"/>
        </div>
        <div class="layout__footer__SubInfo">
          <p class="layout__footer__SubInfo__texte">©2023 TiK•TaK. All rights reserved</p>
          <p class="layout__footer__SubInfo__texte">Projet réalisé dans le cadre d’un exercice <a href="https://mmimontbeliard.com/"> pédagogique au département MMi de Montbéliard.</a></p>
        </div>
      </slot>
    </footer>
  </main>
</template>
<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template:
    'header'
    'article'
    'aside'
    'footer';

  @include medium-up {
    grid-template:
      'header header header'
      'article article article'
      'footer footer footer';
  }

  > * {
    padding: rem(0);
  }

  &__article {
    grid-area: article;
    width: 100%;
  }

  &__aside {
    grid-area: aside;
  }

  &__footer {
    background: $primary-color;
    grid-area: footer;
    color: $white;
 

    &__logo {
      width: rem(120);
      margin: rem(0) auto;
      padding: rem(16);
    }
    &__social{
      text-align: center;
      margin-bottom: rem(16);
      padding: rem(16);
      gap: rem(16);

      &__icon{
        margin: rem(10);
        align-items: center;
        background: $white;
        border-radius: 100%;
        box-shadow: 0 0 rem(5) 0 $gray;
        display: inline-flex;
        height: rem(50);
        justify-content: center;
        width: rem(50);
      }
    }
    &__SubInfo{
      border-top: solid 1px $white ;
      padding: rem(20);
      text-align: center;
      color: $white;     
      font-family: $primary-font-familly;

      &__texte{
        margin: rem(16);
      }
      a{
        color: $white;
        // text-decoration de couleur vert
        text-decoration: underline $secondary-color;
        &:hover {
          color: $white;
          text-decoration: none;
        }
      }
    }
  }

  &__header {
    background: $primary-color;
    grid-area: header;
    color: $white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(0) rem(20); 
    border-bottom: 1px solid $white ;

    &__logo {
      img {
        width: rem(120); 
        padding: rem(15);
      }
    }

    &__menu {
      
      &__menuitem {
        list-style: none;
        padding: rem(0);
        margin: rem(0);
        text-align: right;
        text-decoration: none;

        &__element {
          display: inline-block;
          margin-left: rem(16);
          font-family: $primary-font-familly;         
          font-family: $primary-font-familly;
          &__login {
            background: $white;
            color: $black!important;
            padding: rem(32);
            border-radius: rem(0);
          }
          a{
            color: $white;
            text-decoration: none;
            &:hover {
              color: $white;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
}

</style>
<script setup>
import MyIcon from '@/components/elements/MyIcon.vue'
import AsideLayout from '@/components/layout/AsideLayout.vue'

</script>
