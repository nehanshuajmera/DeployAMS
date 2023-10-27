
exports.logoutuser= async (req, res) => {
    try {
        res
        .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
        })
        .send();
    } catch (err) {
        res.status(400).send(err);
    }
}