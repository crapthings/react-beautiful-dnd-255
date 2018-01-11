_ = require('lodash')
moment = require('moment')

faker = require('faker')

React = require('react')
Component = React.Component

withTracker = require('meteor/react-meteor-data').withTracker

mount = require('react-mounter').mount

Projects = new Mongo.Collection('projects')
Tasks = new Mongo.Collection('tasks')
Todos = new Mongo.Collection('todos')

LoadingView = props => {
  const { text, children } = props
  if (children)
    return children()

  return <div>{text || 'loading'}</div>
}

NotFoundView = props => {
  const { text, children } = props
  if (children)
    return children()

  return <div>{text || 'loading'}</div>
}
