var app = app || {};

app.Deck = Backbone.Model.extend({
  relations: [{
       type: Backbone.HasMany,   // Type of relationship
       key: 'cards',            // How we reference the sub-models in collection
       relatedModel: 'Card',    // The sub-model type
       collectionType: 'Cards'  // The sub-model collection

     }],
  urlRoot: "/decks"

});
