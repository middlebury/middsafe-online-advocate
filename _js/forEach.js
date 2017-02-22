module.exports = function(items, cb) {
  var itemsCount = items.length;
  for(var i = 0; i < itemsCount; i++) {
    cb(items[i], i);
  }
};
