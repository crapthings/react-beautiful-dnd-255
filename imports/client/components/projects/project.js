import { Board as BoardView } from '../board'

const dataset = ({ _id }) => {
  const ready = Meteor.subscribe('project', _id).ready()
  if (!ready) return { ready }

  const id = _id
  const board = Mongo.Collection.get('projects').findOne(_id)
  const decks = board.decks
  const deckType = 'TASK'
  const cardType = 'TODO'

  return { ready, id, board, decks, deckType, cardType }
}

const view = props => {
  const { ready } = props
  if (!ready) return <LoadingView />
  return <div>
    <Nav {...props} />
    <BoardView {...props} />
  </div>
}

const createDeck = props => evt => {
  const { _id } = props
  const name = prompt('请输入 deck name')
  if (!name) return
  Meteor.call('create.deck', _id, { name })
}

const Nav = props => {
  return <div>
    <button href='#' onClick={createDeck(props)}>创建 deck</button>
  </div>
}

export default withTracker(dataset)(view)
