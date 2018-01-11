const Nav = () => {
  return <ul>
    <li><a href='/'>首页</a></li>
    <li><a href='#' onClick={createProject}>添加项目</a></li>
  </ul>

  function createProject(e) {
    e.preventDefault()
    const title = prompt('项目名称')
    if (!title)
      return
    const project = { title }
    Meteor.call('create.project', project)
  }
}

export default props => {
  console.log('layout props', props)
  const { children } = props
  return <div>
    <Nav />
    {children(props)}
  </div>
}
