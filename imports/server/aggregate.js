Mongo.Collection.prototype.aggregate = function (pipelines, options) {
  const coll = this.rawCollection();
  return wrapAsync(coll.aggregate.bind(coll))(pipelines, options);
}

Mongo.Collection.prototype.distinct = function (pipelines, options) {
  const coll = this.rawCollection();
  return wrapAsync(coll.distinct.bind(coll))(pipelines, options);
}

Mongo.Collection.prototype.out = function (collection, pipelines = [], options) {
  return this.aggregate([...pipelines, { $out: collection }], options);
}

Mongo.Collection.prototype.join = function (lookup, _as) {
  if (! _.isObject(lookup))
    throw new Error('lookup should be an object')

  const keys = _.keys(lookup)

  if (_.isEmpty(keys))
    throw new Error('xxx')

  const _from = keys[0]

  const _foreignField = _.keys(lookup[_from])[0]
  const _localField = lookup[_from][_foreignField]

  console.log(_from, _foreignField, _localField, _as)

  _as = _as || _from

  return this.aggregate([{
    $lookup: {
      from: _from,
      foreignField: _foreignField,
      localField: _localField,
      as: _as,
    }
  }])
}

Mongo.Collection.prototype.joinOne = function (lookup, _as) {
  if (! _.isObject(lookup))
    throw new Error('lookup should be an object')

  const keys = _.keys(lookup)

  if (_.isEmpty(keys))
    throw new Error('xxx')

  const _from = keys[0]

  const _foreignField = _.keys(lookup[_from])[0]
  const _localField = lookup[_from][_foreignField]

  console.log(_from, _foreignField, _localField, _as)

  _as = _as || _from

  return this.aggregate([
    {
      $lookup: {
        from: _from,
        foreignField: _foreignField,
        localField: _localField,
        as: _as,
      }
    },

    {
      $unwind: '$' + _as
    },

    {
      $addFields: { [_as]: '$' + _as }
    },
  ])
}
