const User = require("../model/user");
const auth = require("../middleware/auth");

module.exports = {
  createUser: async (args) => {
    const user = new User({
      firstName: args.UserInput.firstName,
      lastName: args.UserInput.lastName,
      password: args.UserInput.password,
      username: args.UserInput.username,
      email: args.UserInput.email,
    });

    try {
      const existingUser = await User.findOne({ email: args.UserInput.email });
      if (existingUser) {
        throw new Error("User already exists");
      }
      return await user.save();
    } catch (e) {
      throw new Error(e);
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.getAuthToken();

      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  },
  readUser:
    (auth,
    (req, res) => {
      res.send(req.user);
    }),

  updateUser:
    ({ email, password },
    auth,
    (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = ["firstName", "lastName", "username"];
      const isValid = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValid) {
        return res.status(400).send({ error: "Invalid resquest" });
      }
      try {
        updates.forEach((update) => (req.user[update] = req.body[update]));

        await req.user.save();

        res.send(req.user);
      } catch (e) {
        res.status(400).send(e);
      }
    }),
};
