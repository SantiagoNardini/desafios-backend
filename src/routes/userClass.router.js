import RouterClass from "./router.js"

class UserRouter extends RouterClass {
    init (){
        this.get('/', ['user'], async (req, res) => {
            try {
                const users = await userModel.find({})
                res.json({
                    status: 'success',
                    result: users
                })
                res.sendSuccess('Get Users')
            } catch (error) {
                res.sendServerError(error.message)
            }
        })
    }
}

export default UserRouter