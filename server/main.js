Projects.remove({})
Tasks.remove({})
Todos.remove({})

Meteor.startup(function () {
  const projectId = Projects.insert({ name: '测试项目' })
  const taskIds = _.times(50, n => Tasks.insert({ name: faker.lorem.word(), projectId }))
  _.each(taskIds, taskId => {
    _.times(_.random(1, 10), n => Todos.insert({ projectId, taskId, text: faker.lorem.sentence() }))
  })
})

import '/imports/server'
