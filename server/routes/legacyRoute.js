router.post("/change-password", (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  if (oldPassword !== "" && newPassword !== "") {
    bcrypt.compare(oldPassword, req.user.password, (err, result) => {
      if (err || !result) {
        res.status(400).json({ message: "Password is incorrect!" });
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPassNew = bcrypt.hashSync(newPassword, salt);
        User.findByIdAndUpdate(req.user.id, {
          password: hashPassNew
        }).then(() =>
          res.status(200).json({ message: "Password changed successfully!" })
        );
      }
    });
  } else {
    res.status(400).json({ message: "Please enter both fields!" });
  }
});

router.post("/change-email", (req, res, next) => {
  let { oldEmail, newEmail } = req.body;
  console.log(req.user.email, oldEmail);
  if (oldEmail !== req.user.email) {
    return res.status(400).json({ message: "Email is not correct!" });
  }

  User.findOne({ email: newEmail })
    .then(user => {
      if (user !== null) {
        res.status(400).json({ message: "E-mail already in use" });
      } else {
        User.findByIdAndUpdate(req.user._id, {
          email: newEmail
        }).then(user => {
          res.status(200).json({ message: "Email updated" });
        });
      }
    })
    .catch(err => console.log(err));
});

router.post("/change-password", (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  if (oldPassword !== "" && newPassword !== "") {
    bcrypt.compare(oldPassword, req.user.password, (err, result) => {
      if (err || !result) {
        res.status(400).json({ message: "Password is incorrect!" });
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPassNew = bcrypt.hashSync(newPassword, salt);
        User.findByIdAndUpdate(req.user.id, {
          password: hashPassNew
        }).then(() =>
          res.status(200).json({ message: "Password changed successfully!" })
        );
      }
    });
  } else {
    res.status(400).json({ message: "Please enter both fields!" });
  }
});
