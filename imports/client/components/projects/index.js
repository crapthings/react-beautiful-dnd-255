import Layout from '../layout'
import ProjectsView from './projects'
import ProjectView from './project'

FlowRouter.route('/projects', {
  action() {
    mount(Layout, {
      children: () => <ProjectsView />
    })
  }
})

FlowRouter.route('/projects/:_id', {
  action({ _id }) {
    mount(Layout, {
      children: () => <ProjectView _id={_id} />
    })
  }
})
