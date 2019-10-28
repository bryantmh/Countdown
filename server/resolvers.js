export default {
  Query: {
    times(root, args, { models }) {
      return models.time.findAll()
    },
    time(root, { id }, { models }) {
      return models.time.findByPk(id)
    },
    users(root, args, { models }) {
      return models.user.findAll()
    },
    user(root, { id }, { models }) {
      return models.user.findByPk(id)
    }
  },
  Mutation: {
    createTime: (parent, data, { db }, info) =>
      db.time.create(data),
    deleteTime: (parent, { id }, { db }, info) =>
      db.time.destroy({
        where: {
          id: id
        }
      }),
    createUser: (parent, data, { db }, info) =>
      db.user.create(data),
    deleteUser: (parent, { id }, { db }, info) =>
      db.user.destroy({
        where: {
          id: id
        }
      }),
    updateUser: (parent, data, { db }, info) =>
      db.user.update(data)
  },
  Time: {
    user(time) {
      return time.getUser()
    }
  },
  User: {
    times(user) {
      return user.getTimes()
    }
  }
}
