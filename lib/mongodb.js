import { schemes as seedSchemes, complaintsSeed, profileDefaults } from "./data";

const collections = {
  schemes: [...seedSchemes],
  complaints: [...complaintsSeed],
  applications: [],
  profiles: []
};

const createMockCollection = (name) => {
  return {
    find: (query = {}) => {
      let result = [...(collections[name] || [])];
      if (query.userId) result = result.filter(r => r.userId === query.userId);
      
      const chain = {
        sort: () => chain,
        project: () => chain,
        limit: () => chain,
        toArray: async () => result
      };
      return chain;
    },
    findOne: async (query = {}) => {
      const items = collections[name] || [];
      if (query.userId) return items.find(r => r.userId === query.userId) || null;
      return items[0] || null;
    },
    countDocuments: async () => {
      return (collections[name] || []).length;
    },
    insertMany: async (docs) => {
      if (!collections[name]) collections[name] = [];
      collections[name].push(...docs);
      return { insertedCount: docs.length };
    },
    insertOne: async (doc) => {
      if (!collections[name]) collections[name] = [];
      const newDoc = { ...doc, _id: Date.now().toString() };
      collections[name].push(newDoc);
      return { insertedId: newDoc._id };
    },
    updateOne: async (query, update, options) => {
      if (!collections[name]) collections[name] = [];
      let item = collections[name].find(r => r.userId === query.userId);
      if (item) {
        if (update.$set) Object.assign(item, update.$set);
      } else if (options?.upsert) {
        item = { ...query, ...(update.$set || {}) };
        if (update.$setOnInsert) Object.assign(item, update.$setOnInsert);
        collections[name].push(item);
      }
      return { modifiedCount: 1 };
    },
    findOneAndUpdate: async (query, update, options) => {
      if (!collections[name]) collections[name] = [];
      let item = collections[name].find(r => r._id === query._id);
      if (!item && options?.upsert) {
        item = { ...query };
        collections[name].push(item);
      }
      if (item && update.$inc) {
        for (const [k, v] of Object.entries(update.$inc)) {
          item[k] = (item[k] || 0) + v;
        }
      }
      return { value: item };
    },
    createIndex: async () => {}
  };
};

const mockDb = {
  collection: (name) => createMockCollection(name)
};

export async function getDb() {
  return mockDb;
}

export default Promise.resolve(mockDb);
