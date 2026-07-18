export const protect = async (req, res, next) => {
    try {
        const { userId, has } = await req.auth();

        if(!userId){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const hasPremiumPlan = await has({plan: 'premium'});
        req.plan = hasPremiumPlan ? 'premium' : 'free';
        return next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.code || error.message });
    }
}