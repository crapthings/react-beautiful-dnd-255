import Layout from '../layout'
import HomeView from './view'

FlowRouter.route('/', {
  action() {
    mount(Layout, {
      children: () => <HomeView />
    })
  }
})
