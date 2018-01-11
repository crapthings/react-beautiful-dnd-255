const dataset = (props) => {
  const ready = Meteor.subscribe('projects').ready()

  if (!ready)
    return { ready }

  const projects = Projects.find().fetch()

  return { ready, projects }
}

class view extends Component {
  render() {
    const { ready, projects } = this.props

    if (!ready)
      return <LoadingView />

    return projects.map((project, projectIdx) => <ProjectItem key={projectIdx} {...project} />)

    function ProjectItem({ _id, name }) {
      return <div key={_id}>
        <a href={`/projects/${_id}`}>{name}</a>
      </div>
    }
  }
}

export default withTracker(dataset)(view)
