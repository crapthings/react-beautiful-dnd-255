import ReactDOM from 'react-dom'
import { DraggableProvided } from 'react-beautiful-dnd'

export default class QuoteItem extends Component {
  componentDidMount() {
    if (! this.props.autoFocus)
      return

    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this)
    node.focus()
  }

  render() {
    const { quote, isDragging, provided } = this.props

    return (
      <div className={`card ${isDragging}`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div>{quote.text}</div>
      </div>
    )
  }
}
