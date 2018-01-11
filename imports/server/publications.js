Meteor.publish('projects', function () {
  return Projects.find()
})

Meteor.publish('project', function (_id) {
  const board = Projects.findOne(_id)
  const decks = Tasks.find({ projectId: _id }).fetch()
  const cards = Todos.find({ projectId: _id }).fetch()
  const groupCardsByDeckId = _.groupBy(cards, 'taskId')
  _.each(decks, deck => deck.cards = groupCardsByDeckId[deck._id])
  board.decks = decks
  this.added('projects', _id, board)
  this.ready()
})
