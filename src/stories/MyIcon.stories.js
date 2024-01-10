import MyIcon from '@/components/elements/MyIcon.vue'

export default {
  title: 'Elements/MyIcon',
  component: MyIcon,
  argTypes: {
    name : {
      control : "select",
      options : ['Facebook', 'Instagram', 'Twitter', 'Panier',]
    }
  }
}

export const Icon = {
  render: (args) => {
    return {
      components: {
        MyIcon,
      },
      setup(){
        return { args }
      },
      template: `<MyIcon v-bind="args" />`
    }
  },
  args: {
    name: 'Facebook'
  }
}