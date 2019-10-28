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
    createTime: (parent, data, { models }, info) =>
      models.time.create(data),
    deleteTime: (parent, { id }, { models }, info) =>
      models.time.destroy({
        where: {
          id: id
        }
      }),
    createUser: (parent, data, { models }, info) =>
      models.user.create(data),
    deleteUser: (parent, { id }, { models }, info) =>
      models.user.destroy({
        where: {
          id: id
        }
      }),
    updateUser: (parent, data, { models }, info) =>
      models.user.update(data)
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
