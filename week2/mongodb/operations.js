

exports.insertDocuments= (db, document, collection) =>{
    const coll = db.collection(collection);
    return coll.insert(document);
};

exports.findDocuments= (db, collection) =>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocuments= (db, document, collection) =>{
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocuments= (db, document, update, collection) =>{
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set : update}, null);
};


