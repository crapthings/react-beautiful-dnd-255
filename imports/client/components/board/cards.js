import { Droppable, Draggable } from 'react-beautiful-dnd'
import Card from './card'

export default class QuoteList extends Component {
  renderQuotes = dropProvided => {
    const { listType, quotes, cards } = this.props
    const title = this.props.title ? (
      this.props.title
    ) : null

    return (
      <div>
        {title}
        <div className='DropZone' ref={dropProvided.innerRef}>
          {quotes.map((quote, quoteIdx) => {
            // quote = cards[quote]
            return (
              <Draggable key={quote._id} draggableId={quote._id} type={listType} index={quoteIdx}>
                {(dragProvided, dragSnapshot) => (
                  <div>
                    <Card
                      key={quote._id}
                      quote={quote}
                      isDragging={dragSnapshot.isDragging}
                      provided={dragProvided}
                      autoFocus={this.props.autoFocusCardId === quote._id}
                    />
                    {dragProvided.placeholder}
                  </div>
                )}
              </Draggable>
            )
          })}
          {dropProvided.placeholder}
        </div>
      </div>
    )
  }

  render() {
    const { listId, listType, internalScroll, isDropDisabled, style } = this.props
    return (
      <Droppable droppableId={listId} isDropDisabled={isDropDisabled} type={listType}>
        {(dropProvided, dropSnapshot) => (
          <div
            className='cardWrapper'
            style={style}
            // isDraggingOver={dropSnapshot.isDraggingOver}
            // isDropDisabled={isDropDisabled}
          >
            {internalScroll ? (
              <div className='ScrollContainer'>
                {this.renderQuotes(dropProvided)}
              </div>
            ) : (
              this.renderQuotes(dropProvided)
            )}
          </div>
        )}
      </Droppable>
    )
  }
}
