import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Deck from './deck'

const isDraggingClassName = 'is-dragging'

export default class view extends Component {
  state = {
    autoFocusCardId: null,
  }

  componentDidMount() {}

  onDragStart = initial => {
    document.body.classList.add(isDraggingClassName)

    this.setState({
      autoFocusCardId: null,
    })
  }

  onDragEnd = result => {
    document.body.classList.remove(isDraggingClassName)
    if (!result.destination) return
  }

  render() {
    const { id, decks } = this.props
    console.log(decks)
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <Droppable droppableId={id} type='BOARD' direction='horizontal'>
          {provided => (
            <div className='board' ref={provided.innerRef}>
              {decks.map(deck => <Deck
                autoFocusCardId={this.state.autoFocusCardId}
                key={deck._id}
                deckId={deck._id}
                name={deck.name}
                cards={deck.cards}
              />)}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
