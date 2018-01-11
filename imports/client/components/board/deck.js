import { Draggable } from 'react-beautiful-dnd'
import Cards from './cards'

const AddCardBtn = ({ deckId }) => <button onClick={e => {
  const content = prompt('card content')
  if (! content)
    return

  const url = faker.image.imageUrl()
  Meteor.call('createCard', { deckId, content, author: { url } }, deckId)
}}>+</button>

export default class component extends Component {
  render() {
    const { deckId, name, cards } = this.props
    const quotes = cards
    return (
      <Draggable draggableId={deckId} type='DECK' index={deckId}>
        {(provided, snapshot) => {
          return (
            <div className='deck'>
              <div
                className='deck-container'
                ref={provided.innerRef}
                {...provided.draggableProps}
              >
                <div className={`deck-header ${snapshot.isDragging && 'isDragging'}`}>
                  <div
                    className={`${snapshot.isDragging && 'isDragging'}`}
                    {...provided.dragHandleProps}
                  >
                    <div>{name} {deckId}</div>
                    <AddCardBtn deckId={deckId} />
                  </div>
                </div>
                <Cards
                  listId={deckId}
                  listType='CARD'
                  quotes={quotes}
                  cards={cards}
                  autoFocusCardId={this.props.autoFocusCardId}
                />
              </div>
              {provided.placeholder}
            </div>
          )
        }}
      </Draggable>
    )
  }
}
