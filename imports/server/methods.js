Meteor.methods({
  'create.project'(opt) {
    _.extend(opt, {
      deckIds: opt.deckIds || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return Projects.insert(opt)
  },

  'create.deck'(projectId, opt) {
    const project = Projects.findOne(projectId)

    if (! project)
      return

    opt = _.extend(opt, {
      projectId,
    })

    const deckId = Decks.insert(opt)

    Projects.update(projectId, {
      $addToSet: { deckIds: deckId }
    })

    return deckId
  },

  'decks.move'(projectId, deckId, index) {
    console.log(projectId, deckId, index)
    Projects.update(projectId, {
      $pull: {
        deckIds: deckId
      }
    })

    Projects.update(projectId, {
      $push: {
        deckIds: {
          $each: [deckId],
          $position: index,
        }
      }
    })
  },

  reorderDecks(projectId, deckIds) {
    Projects.update(projectId, {
      $set: { deckIds }
    })
  },

  createCard(card, deckId) {
    const cardId = Cards.insert(card)
    Decks.update(deckId, { $addToSet: { cardIds: cardId } })
    return cardId
  },

  reorderCards(cardId, deckId, index) {
    console.log(cardId,deckId,index)
    Decks.update(deckId, {
      $pull: {
        cardIds: cardId
      }
    })

    Decks.update(deckId, {
      $push: {
        cardIds: {
          $each: [cardId],
          $position: index,
        }
      }
    })
  },

  moveCard(cardId, sourceId, targetId, index) {
    Cards.update(cardId, {
      $set: { deckId: targetId }
    })
    Decks.update(sourceId, {
      $pull: {
        cardIds: cardId
      }
    })

    Decks.update(targetId, {
      $push: {
        cardIds: {
          $each: [cardId],
          $position: index,
        }
      }
    })
  },
})
